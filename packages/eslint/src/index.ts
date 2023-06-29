import features from "./features";
import { IApi } from "./type";
import { PRESET_NAME } from "./constants";

// 为用户导出需要的 类型 和 工具函数
export * from "./type";
export { default as defineConfig } from "./defineConfig";

export default (api: IApi) => {
  // key 用来识别插件 否则会使用默认的小驼峰包名 容易和其他插件重复
  api.describe({
    key: `doctor-preset-${PRESET_NAME}`,
  });

  return {
    plugins: [
      //commands
      require.resolve("./commands/eslint"),
      //features
      ...features,
    ],
  };
};
