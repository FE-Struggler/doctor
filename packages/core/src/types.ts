import type { IServicePluginAPI, PluginAPI } from "@umijs/core";

export type IApi = PluginAPI & IServicePluginAPI;

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
  SUCCESS = "success",
}
export type IDoctorConfig = {
  tools: {
    nodeVersion: DoctorLevel;
  };
};
