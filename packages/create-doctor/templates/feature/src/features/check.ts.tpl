import type { IApi } from "../type";
import { DoctorLevel } from "@doctors/core";

export default (api: IApi) => {
  api.addDoctorCheckBefore(() => {});

  api.addDoctorCheck(() => {
    return {
      label: "Happy Path",
      description: "",
      doctorLevel: DoctorLevel.SUCCESS,
    };
  });

  api.addDoctorCheckEnd(() => {});
};
