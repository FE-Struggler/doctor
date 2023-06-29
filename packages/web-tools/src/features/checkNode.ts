import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { chalkByDoctorLevel } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));

    const ruleLevel = (api.userConfig.tools?.nodeVersion ||
      DoctorLevel.WARN) as DoctorLevel;

    if (ruleLevel === DoctorLevel.OFF) return;

    const isNodeVersionFine = nodeVersion > 12;
    const doctorLevel = isNodeVersionFine ? DoctorLevel.SUCCESS : ruleLevel;

    return {
      label: "Node Version",
      description: `Node Version should be greater than 12.x  ${chalkByDoctorLevel(
        doctorLevel,
        `Now: ${process.version}`
      )}`,
      doctorLevel,
    };
  });
};
