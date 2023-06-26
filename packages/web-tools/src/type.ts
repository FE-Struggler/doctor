import type { IApi as DoctorApi, DoctorMeta, DoctorLevel } from "@doctors/core";
import type { Awaitable } from "@doctors/utils";

/** 校验配置文件以及类型提示的 Schema 列表，用每一个 Preset 来单独维护 Schema 以便获得更全面的类型提示 */
export interface ConfigSchema {
  webTools: {
    nodeVersion: DoctorLevel;
  };
}

/** 元数据 **/
interface Meta {}

export interface DoctorLifeCycleApi {
  addDoctorWebToolsCheckBefore: (fn: () => Awaitable<void>) => void;

  addDoctorWebToolsCheck: {
    (fn: (meta?: Meta) => DoctorMeta | undefined): void;
    (fn: (meta?: Meta) => Awaitable<DoctorMeta | undefined>): void;
  };

  addDoctorWebToolsCheckEnd: (fn: () => Awaitable<void>) => void;
}

export type IApi = DoctorApi & DoctorLifeCycleApi;
