import { defineConfig, DoctorLevel } from "@doctors/core";

export default defineConfig({
  tools: {
    nodeVersion: DoctorLevel.WARN,
    // vscodePlugins: ["volar", "Vue.volar", "github"],
    vscode: {
      morePlugins: [{ name: "Vue.volar", desc: "自定义描述", version: "1.0" }],
    },
  },
});
