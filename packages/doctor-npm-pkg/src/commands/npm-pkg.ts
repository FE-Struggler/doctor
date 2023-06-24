import { IApi, generatePreset } from "@doctors/core";
import type { Nullify } from "@doctors/core";
import { ConfigSchema } from "../type";

export default (api: IApi) => {
  const COMMAND_NAME = "npm-pkg";
  const schema: Nullify<ConfigSchema> = {};
  const meta = {};

  generatePreset(api, COMMAND_NAME, schema, meta);
};
