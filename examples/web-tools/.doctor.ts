import { DoctorLevel } from "@doctors/core";
import { defineConfig } from "@doctors/web-tools";

export default defineConfig({
  webTools: {
    nodeVersion: DoctorLevel.ERROR,
    vscode: {
      morePlugins: [
        {
          name: "Vue.volar",
          desc: "成功时描述",
          version: "1.0",
        },
      ],
    },
  },
});
