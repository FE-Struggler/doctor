import type { IApi } from "../type";
import { DoctorLevel } from "@doctors/core";

const fs = require("fs");
const path = require("path");
export default (api: IApi) => {
  // 解构 meta
  api.addDoctorEslintCheck((meta) => {
    const { eslintConfig } = meta;
    let isEsLintOk: boolean = true;
    const prerequisites = ["env", "extends", "parserOptions", "rules"];
    const configKeys = Object.keys(eslintConfig);
    prerequisites.forEach((item) => {
      if (!configKeys.includes(item)) {
        isEsLintOk = false;
      }
    });
    const doctorLevel = isEsLintOk ? DoctorLevel.SUCCESS : DoctorLevel.WARN;
    return isEsLintOk
      ? {
          label: "ESLint Check",
          description: "ESLint prerequisites have been configured",
          doctorLevel,
        }
      : {
          label: "ESLint Check",
          description: "ESLint prerequisites have not been configured",
          doctorLevel,
        };
  });
};
/**
 * @description:获取eslint配置
 * @return {*}
 * @param api
 */
export function getConfigFile(api: IApi) {
  const cwd = api.service.paths.cwd;
  let config = "";
  let files = fs.readdirSync(cwd);
  for (let i = 0; i < files.length; i++) {
    if (files[i].includes("eslintrc")) {
      const filedir = path.join(cwd, files[i]);
      const file = fs.statSync(filedir);
      if (file.isFile()) {
        //判断是否为文件
        config = fs.readFileSync(filedir, "utf-8");
        return JSON.parse(config);
      }
    }
  }
  //也可能在package.json中
}
