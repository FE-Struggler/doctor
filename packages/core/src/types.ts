export { IApi } from "umi";

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
