import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";
import { DoctorLevel } from "@doctors/core";

// 元数据
interface Meta {}

export type IApi = DoctorApi & {
  addDoctorNpmPkgCheckBefore: (fn: () => void) => void;

  addDoctorNpmPkgCheck: (fn: (meta: Meta) => DoctorMeta[] | DoctorMeta) => void;

  addDoctorNpmPkgCheckEnd: (fn: () => void) => void;
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
