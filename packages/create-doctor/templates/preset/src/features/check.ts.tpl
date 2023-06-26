import type { IApi } from "../type.ts";
import { DoctorLevel } from "@doctors/core";

export default (api: IApi) => {
  api.addDoctor{{{ commandCamelCased }}}CheckBefore(() => {});

  api.addDoctor{{{ commandCamelCased }}}Check(() => {
    return {
      label: "Happy Path",
      description: "",
      doctorLevel: DoctorLevel.SUCCESS,
    };
  });

  api.addDoctor{{{ commandCamelCased }}}CheckEnd(() => {});
};
