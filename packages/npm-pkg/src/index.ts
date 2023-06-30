import features from "./features";
import { IApi } from "./type";
import { PRESET_NAME } from "./constants";

export * from "./type";
export { default as defineConfig } from "./defineConfig";
export { default as dupInPeerDependencies } from "./features/dupInPeerDependencies";
export { default as checkPkgFilesExist } from "./features/checkPkgFilesExist";
export { default as preferPackFiles } from "./features/preferPackFiles";
export { default as cjsImportEsm } from "./features/cjsImportEsm";

export default (api: IApi) => {
  api.describe({
    key: `doctor-preset-${PRESET_NAME}`,
  });

  return {
    plugins: [require.resolve("./commands/npm-pkg"), ...features],
  };
};
