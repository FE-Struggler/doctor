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
  doctorLevel: DoctorLevel;
}

export enum DoctorLevel {
  OFF = "off",
  WARN = "warn",
  ERROR = "error",
  SUCCESS = "success",
}

export type Nullify<T> = {
  [K in keyof T]: {
    [P in keyof T[K]]: null;
  };
};

export interface RuleResItem {
  label: string;
  description: string;
  doctorLevel: DoctorLevel | "success";
}
