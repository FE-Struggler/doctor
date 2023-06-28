import { join } from "path";
import { IApi, PluginMeta, RuleResItem } from "./types";
import { logger } from "@umijs/utils";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const notValidPackages = ["@doctors/core", "@doctors/utils"];
const validPresetNamePrefix = ["@doctors", "doctors"];

// 通过执行 `npm root -g` 命令获取全局 npm 目录
function getGlobalNodeModulesPath() {
  const command = /^win/.test(process.platform) ? "npm.cmd" : "npm";
  const output = childProcess.execSync(`${command} root -g`).toString().trim();
  const globalNodeModulesPath = output.split("\n")[0];
  return globalNodeModulesPath;
}

const globalNodeModulesPath = path.join(getGlobalNodeModulesPath());

export function getDoctorDependencies() {
  // ------------------- localDep  -------------------
  const localPath = process.cwd();
  const localPresets = getDepPathsWithPkg(localPath);

  const npxCacheModule = join(__dirname, "../../../../");
  const npxCachePresets = getDepPathsWithPkg(npxCacheModule);

  // ------------------- globalDep  -------------------
  const doctorsList = childProcess
    .execSync("npm ls -g --depth=0 --json")
    .toString("utf-8");

  const globalDeps = JSON.parse(doctorsList).dependencies;
  let globalPresets: PluginMeta[] = [];

  for (const key of Object.keys(globalDeps)) {
    if (validPresetNamePrefix.some((i) => key.startsWith(i))) {
      const presetPath = join(globalNodeModulesPath, key);
      const hasCommand = fs.existsSync(
        path.join(presetPath, "./dist/commands")
      );
      globalPresets.push({
        name: key,
        path: presetPath,
        hasCommand,
      });
    }
  }

  // ------------------- outputRepeatInfo  -------------------
  const allDeps = localPresets.concat(globalPresets, npxCachePresets);
  const allPresetsWithoutRepeat = allDeps
    .filter((obj, index, arr) => {
      // 使用 findIndex() 方法查找当前对象在数组中的第一个索引位置
      const firstIndex = arr.findIndex((o) => o.name === obj.name);
      if (index !== firstIndex) {
        logger.warn(
          `there are repeated Plugins named ${obj.name} with ${arr[firstIndex].path} and ${arr[index].path}\n`
        );
      }
      return index === firstIndex; // 只保留第一个出现的对象
    })
    .map((i) => {
      return {
        path: i.path,
        hasCommand: i.hasCommand,
      };
    });

  const sortedByHasCommand = allPresetsWithoutRepeat.sort((a, b) => {
    if (a.hasCommand && !b.hasCommand) {
      return -1; // a 排在前面
    } else if (!a.hasCommand && b.hasCommand) {
      return 1; // b 排在前面
    } else {
      return 0; // 保持原有顺序
    }
  });

  return sortedByHasCommand.map((i) => i.path);
}

function getDepPathsWithPkg(rootPath: string) {
  const pkgPath = path.join(rootPath, "package.json");
  let packageJson;
  if (fs.existsSync(pkgPath)) {
    packageJson = require(pkgPath);
  } else {
    return [];
  }
  const dependencyNames = Object.keys(packageJson?.dependencies || []);
  const doctorDependencyNames = dependencyNames.filter(
    (name) =>
      validPresetNamePrefix.some((i) => name.startsWith(i)) &&
      !notValidPackages.includes(name)
  );
  return doctorDependencyNames.map((name) => {
    const modulePath = path.join(rootPath, "node_modules", name);
    const modulePackageJson = require(path.join(modulePath, "package.json"));
    const hasCommand = fs.existsSync(path.join(modulePath, "./dist/commands"));
    return {
      name,
      version: modulePackageJson.version,
      path: modulePath,
      hasCommand,
    };
  }) as PluginMeta[];
}

export function applyTypeEffect(api: IApi, name: string) {
  [
    `addDoctor${name}CheckBefore`,
    `addDoctor${name}Check`,
    `addDoctor${name}CheckEnd`,
  ].forEach((name) => {
    api.registerMethod({ name });
  });
}

export function toUpperUnderscore(str) {
  return str
    .replace(/([A-Z])/g, "_$1") // 在大写字母前添加下划线
    .toUpperCase(); // 转换为大写字母
}

export function mergeObjectsByProp(arr) {
  const result: RuleResItem[] = [];
  const map = new Map();
  for (const obj of arr) {
    const key = obj["label"];
    if (map.has(key)) {
      map
        .get(key)
        .descriptions.push({
          suggestion: obj.description,
          level: obj.doctorLevel,
        });
    } else {
      const realItem = Object.assign({}, obj);
      realItem.descriptions = [
        { suggestion: obj.description, level: obj.doctorLevel },
      ];
      map.set(key, realItem);
    }
  }
  map.forEach((value) => result.push(value));
  return result;
}
