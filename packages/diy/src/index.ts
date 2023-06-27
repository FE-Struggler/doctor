import { IApi, generateDiy } from "@doctors/core";

export default (api: IApi) => {
  return generateDiy({
    api,
    presets: [
      require.resolve("@doctors/web-tools"),
      require.resolve("@doctors/npm-pkg"),
      require.resolve("doctors-yang-author"),
    ],
    commands: ["web-tools", "npm-pkg"],
  });
};
