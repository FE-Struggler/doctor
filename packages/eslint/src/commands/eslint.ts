import { generatePreset } from "@doctors/core";
import { IApi } from "../type";
import { ConfigSchema } from "../type";
import { Nullify } from "@doctors/core";
import { getConfigFile } from "../features/checkConfigured";
import { PRESET_NAME } from "../constants";

const schema: Nullify<ConfigSchema> = {
  eslint: {},
};

export default (api: IApi) => {
  const meta = {
    eslintConfig: getConfigFile(api), // 从 getConfigFile 获取
  };
  generatePreset({
    api,
    command: PRESET_NAME,
    schema,
    meta,
  });
};
