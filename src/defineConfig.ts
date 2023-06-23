import type { IDoctorConfig } from './types';

type ConfigType = IDoctorConfig;

export function defineConfig(config: ConfigType): ConfigType {
  return config;
}
