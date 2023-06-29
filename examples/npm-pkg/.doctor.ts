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
    compileFiles: ["./main.ts", "src/*.ts"],
    // 开启cjs选项才会进行cjs相关检查,根据 entry 的文件为入口扫描该入口文件路径下的所有js和ts文件
    cjs: {
      open: true,
      cjsImportEsm: {
        level: DoctorLevel.WARN,
      },
    },
  },
});
