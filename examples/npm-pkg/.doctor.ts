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
    entry: ["./main.ts", "src/**/*.ts"],
    // 开启cjs选项才会进行cjs相关检查
    cjs: {},
  },
});
