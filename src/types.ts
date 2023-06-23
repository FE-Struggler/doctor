import { IApi as UmiIApi } from "umi"
export type IApi = UmiIApi & {
  addDoctorWebToolsCheck: (fn: Function) => void
}

export enum DoctorLevel  {
  OFF = 'off',
  WARN = 'warn',
  ERROR = 'error'
}
export type IDoctorConfig = {
  tools: {
    nodeVersion: DoctorLevel
  }
}
