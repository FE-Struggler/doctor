import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";
import { DoctorLevel } from "@doctors/core";

// 元数据
interface Meta {}

export type IApi = DoctorApi & {
  addDoctorNpmPkgCheckBefore: (
    fn: (meta: Meta) => DoctorMeta[] | DoctorMeta | undefined
  ) => void;

  addDoctorNpmPkgCheck: (
    fn: (meta: Meta) => DoctorMeta[] | DoctorMeta | undefined
  ) => void;

  addDoctorNpmPkgCheckEnd: (
    fn: (meta: Meta) => DoctorMeta[] | DoctorMeta | undefined
  ) => void;
};

export interface ConfigSchema {
  npmPkg?: {
    peerDepAndDepRepeat?: {
      level?: DoctorLevel;
      exclude?: string[];
    };
    checkPkgFilesExist?: {
      level?: DoctorLevel;
    };
    preferPackFiles?: {
      level?: DoctorLevel;
    };
  };
}
