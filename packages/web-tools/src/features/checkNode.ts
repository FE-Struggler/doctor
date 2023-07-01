import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { chalkByDoctorLevel, getIntNodeVersion } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const ruleLevel = api.userConfig.webTools?.nodeVersion || DoctorLevel.WARN;

    if (ruleLevel === DoctorLevel.OFF) return;

    const nodeVersion = getIntNodeVersion();
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
