import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";

// 元数据
interface Meta {}

export type IApi = DoctorApi & {
  addDoctorNpmPkgCheckBefore: (fn: () => void) => void;

  addDoctorNpmPkgCheck: (fn: (meta: Meta) => DoctorMeta[]) => void;

  addDoctorNpmPkgCheckEnd: (fn: () => void) => void;
};

export interface ConfigSchema {}
