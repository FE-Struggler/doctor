import type { IApi } from "../type";

export default (api: IApi) => {
  api.addDoctorCheckBefore(() => {});

  api.addDoctorCheck(() => {
    return {
      label: "Happy Path",
      description: "",
      doctorLevel: "success",
    };
  });

  api.addDoctorCheckEnd(() => {});
};
