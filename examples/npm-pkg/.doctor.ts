import { DoctorLevel } from "@doctors/core";
import { defineConfig } from "@doctors/npm-pkg";

export default defineConfig({
  npmPkg: {
    peerDepAndDepRepeat: {
      level: DoctorLevel.WARN,
      exclude: ["@doctors/core"],
    },
    checkPkgFilesExist: {
      level: DoctorLevel.ERROR,
    },
    preferPackFiles: {
      level: DoctorLevel.WARN,
    },
    compileFiles: ["src/index.ts"],
    // 开启cjs选项才会进行cjs相关检查,根据 compileFiles 的文件为扫描该文件路径下的所有js和ts文件,没有 compileFiles 字段则对项目全部的ts和js文件进行判断
    cjs: {
      open: true,
      cjsImportEsm: {
        level: DoctorLevel.WARN,
      },
    },
  },
});
