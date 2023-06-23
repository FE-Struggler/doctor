import { IApi, generatePreset } from "packages/core/dist";

export default (api: IApi) => {
  generatePreset(api, "web-tools", {
    tools: {
      nodeVersion: null,
    },
  });
};
