import type { IApi as DoctorApi, DoctorMeta } from "@doctors/core";
import { DoctorLevel } from "@doctors/core";
import { SourceFile } from "./utils";

// 元数据
export interface Meta {
  sourceFiles?: SourceFile[];
}

export type IApi = DoctorApi &
  Meta & {
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
    entry?: string | string[];
    cjs?: {
      open: boolean;
      cjsImportEsm?: {
        level?: DoctorLevel;
      };
    };
  };
}
