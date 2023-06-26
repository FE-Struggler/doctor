import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { chalkByDoctorLevel } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const defaultBrowser = await import("default-browser");
    const defaultBrowserName = (await defaultBrowser.default()).name;
    const description = `Set the Chrome as default browser is best  ${chalkByDoctorLevel(
      DoctorLevel.SUCCESS,
      `Now: ${defaultBrowserName}`
    )}`;
    if (defaultBrowserName === "Chrome") {
      return {
        label: "Default Browser",
        description,
        doctorLevel: DoctorLevel.SUCCESS,
      };
    } else {
      return {
        label: "Default Browser",
        description,
        doctorLevel: DoctorLevel.WARN,
      };
    }
  });
};
