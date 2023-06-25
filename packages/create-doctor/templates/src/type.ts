import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";

interface Meta {}

export type IApi = DoctorApi & {
  addDoctorCheckBefore: (fn: () => void) => void;

  addDoctorCheck: (fn: (meta: Meta) => DoctorMeta[]) => void;

  addDoctorCheckEnd: (fn: () => void) => void;
};

export interface ConfigSchema {}
