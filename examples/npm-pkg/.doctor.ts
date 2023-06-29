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
  },
});
