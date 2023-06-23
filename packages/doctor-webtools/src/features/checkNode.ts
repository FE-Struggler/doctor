import { IApi } from "@doctors/core";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools.nodeVersion;
    if (ruleLevel === "off") return;
    if (nodeVersion > 12) {
      return [
        {
          label: "Node Version",
          description: "Node Version can't bigger than 12.x",
          doctorLevel: "success",
        },
      ];
    }
  });
};
