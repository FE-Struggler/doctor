import { IApi } from "./types";

const fs = require('fs');
const path = require('path');

export function getDoctorDependencies() {
  // 获取当前项目的根目录
  const rootPath = process.cwd()

  // 读取 package.json 文件
  const packageJson = require(path.join(rootPath, 'package.json'));

  // 获取所有依赖的名称数组
  const dependencyNames = Object.keys(packageJson.dependencies);

  // 过滤出以 "doctor" 开头的依赖名称数组
  const doctorDependencyNames = dependencyNames.filter(name => name.startsWith('@doctors'));

  // 构造以 "doctor" 开头的依赖信息数组
  const doctorDependencies = doctorDependencyNames.map(name => {
    const modulePath = path.join(rootPath, 'node_modules', name);
    const modulePackageJson = require(path.join(modulePath, 'package.json'));
    return {
      name,
      version: modulePackageJson.version,
      path: modulePath
    };
  });

  return doctorDependencies;
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
