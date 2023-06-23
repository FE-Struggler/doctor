import { IApi } from "@doctors/core";
import { DoctorLevel } from "@doctors/core";
import { chalk } from "@umijs/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools.nodeVersion || DoctorLevel.WARN;
    if (ruleLevel === "off") return;
    if (nodeVersion > 12) {
      return [
        {
          label: "Node Version",
          description: `Node Version can't bigger than 12.x  ${chalk.green(
            "Now:"
          )} ${chalk.green(process.version)}`,
          doctorLevel: "success",
        },
      ];
    }
  });
};
