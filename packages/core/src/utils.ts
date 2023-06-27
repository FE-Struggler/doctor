import { join } from "path";
import { IApi, PluginMeta } from "./types";

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
const globalDoctorPath = path.join(globalNodeModulesPath, "@doctors");

export function getDoctorDependencies() {
  // 获取当前项目的根目录
  const rootPath = process.cwd();

  // 读取 package.json 文件
  const packageJson = require(path.join(rootPath, "package.json"));

  // 获取所有依赖的名称数组
  const dependencyNames = Object.keys(packageJson?.dependencies || []);

  const doctorDependencyNames = dependencyNames.filter(
    (name) =>
      validPresetNamePrefix.some((i) => name.startsWith(i)) &&
      !notValidPackages.includes(name)
  );

  const globalDepWithDoctor = readFilesInDirectory(globalNodeModulesPath)
    .filter((i) => i.startsWith("doctor"))
    .map((i) => path.join(globalNodeModulesPath, i));
  const globalPresets = readFilesInDirectory(globalDoctorPath)
    .map((i) => join(globalDoctorPath, i))
    .concat(...globalDepWithDoctor);

  // 构造以 "doctor" 开头的依赖信息数组
  const doctorDependencies = doctorDependencyNames.map((name) => {
    const modulePath = path.join(rootPath, "node_modules", name);
    const modulePackageJson = require(path.join(modulePath, "package.json"));
    const hasCommands = fs.existsSync(path.join(modulePath, "commands"));
    return {
      name,
      version: modulePackageJson.version,
      path: modulePath,
      hasCommands,
    };
  }) as PluginMeta[];

  return {
    localPresets: doctorDependencies,
    globalPresets,
  };
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

function readFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath, { withFileTypes: true });
  const result: string[] = [];

  files.forEach((file) => {
    const fileName = file.name;
    if (file.isDirectory()) {
      // 递归读取子目录中的文件
      const subDirectoryPath = path.join(directoryPath, fileName);
      const subFiles = readFilesInDirectory(subDirectoryPath);
      result.push(...subFiles);
    } else {
      // 添加文件名和扩展名信息
      const extName = path.extname(fileName);
      const presetName = path.basename(fileName, extName);
      result.push(presetName);
    }
  });

  return result;
}
