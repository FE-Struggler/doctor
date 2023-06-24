import { IApi as UmiIApi } from "umi";
import type { Awaitable } from "@doctors/shared";

export interface PluginMeta {
  name: string;
  version: string;
  path: string;
  hasCommands: boolean;
}

export interface DoctorMeta {
  label: string;
  description: string;
  doctorLevel: DoctorLevel;
}

export type IApi = UmiIApi & {
  addDoctorWebToolsCheck: (
    fn: (doctorInfos: {
      [key: string]: string;
    }) => Awaitable<DoctorMeta | undefined>
  ) => void;
};

export enum DoctorLevel {
  OFF = "off",
  WARN = "warn",
  ERROR = "error",
  SUCCESS = "success",
}

export type IDoctorConfig = {
  tools: {
    nodeVersion: DoctorLevel;
  };
};
