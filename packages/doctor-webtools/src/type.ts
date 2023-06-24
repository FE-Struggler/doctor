import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";

// 元数据
interface Meta {}

export type IApi = DoctorApi & {
  addDoctorWebToolsCheckBefore: (fn: () => void) => void;

  addDoctorWebToolsCheck: (fn: (meta: Meta) => DoctorMeta) => void;

  addDoctorWebToolsCheckEnd: (fn: () => void) => void;
};
