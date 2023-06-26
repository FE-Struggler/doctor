import type { IApi as DoctorApi, DoctorMeta, DoctorLevel } from "@doctors/core";

// 校验配置文件以及类型提示的 Schema 列表
/**
 * 用每一个 Preset 来单独维护 Schema 以便获得更全面的类型提示
 */
export interface ConfigSchema {
  webTools: {
    nodeVersion: DoctorLevel;
  };
}

// 元数据
interface Meta {}

export type IApi = DoctorApi & {
  addDoctorWebToolsCheckBefore: (fn: () => void) => void;

  addDoctorWebToolsCheck: {
    (fn: (meta?: Meta) => DoctorMeta | undefined): void;
    (fn: (meta?: Meta) => Promise<DoctorMeta | undefined>): void;
  };

  addDoctorWebToolsCheckEnd: (fn: () => void) => void;
};
