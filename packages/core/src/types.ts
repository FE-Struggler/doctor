import { IApi as UmiIApi } from "umi";

export interface PluginMeta {
  name: string;
  version: string;
  path: string;
  hasCommands: boolean;
}

export interface DoctorMeta {
  label: string;
  description: string;
  doctorLevel: boolean;
}

export type IApi = UmiIApi & {
  addDoctorWebToolsCheck: (
    fn: (doctorInfos: { [key: string]: string }) => DoctorMeta
  ) => void;
};

export enum DoctorLevel {
  OFF = "off",
  WARN = "warn",
  ERROR = "error",
}
export type IDoctorConfig = {
  tools: {
    nodeVersion: DoctorLevel;
  };
};
