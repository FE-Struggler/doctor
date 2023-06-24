import type { IDoctorConfig } from "./types";

type TConfigType = IDoctorConfig;

export function defineConfig(config: TConfigType): TConfigType {
  return config;
}
