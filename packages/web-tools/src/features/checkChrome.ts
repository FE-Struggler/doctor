import { IApi } from "../type";
import { DoctorLevel } from "@doctors/core";
import { isChromeInstalled } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const isInstalled = await isChromeInstalled();

    if (isInstalled) {
      return {
        label: "isChromeInstalled",
        description: "You should apply Chrome for web development",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }
  });
};
