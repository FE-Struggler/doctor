import { IApi, generatePreset } from "@doctors/core";

export default (api: IApi) => {
  generatePreset(api, "web-tools", {
    tools: {
      nodeVersion: null,
      vscode: null,
    },
  });
};
