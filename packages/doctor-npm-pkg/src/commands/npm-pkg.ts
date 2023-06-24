import { IApi, generatePreset } from "@doctors/core";

export default (api: IApi) => {
  const COMMAND_NAME = "npm-pkg";
  const schema = {};
  const meta = {};

  generatePreset(api, COMMAND_NAME, schema, meta);
};
