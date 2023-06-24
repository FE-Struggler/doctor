import { IApi, generatePreset } from "@doctors/core";

export default (api: IApi) => {
  const COMMAND_NAME = "web-tools";
  const schema = {
    tools: {
      nodeVersion: null,
    },
  };
  const meta = {};

  generatePreset(api, COMMAND_NAME, schema, meta);
};
