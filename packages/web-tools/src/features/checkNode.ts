import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { chalkByDoctorLevel } from "../utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools?.nodeVersion || DoctorLevel.WARN;
    if (ruleLevel === DoctorLevel.OFF) return;

    const isNodeVersionFine = nodeVersion > 12;
    const doctorLevel = isNodeVersionFine ? "success" : ruleLevel;

    return {
      label: "Node Version",
      description: `Node Version can't bigger than 12.x  ${chalkByDoctorLevel(
        doctorLevel,
        `Now: ${process.version}`
      )}`,
      doctorLevel,
    };
  });
};
