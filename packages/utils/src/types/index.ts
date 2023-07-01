import { type IDoctorSourceParseResult } from "../features/scanningParser";

export type Awaitable<T> = T | Promise<T>;

export interface SourceFile {
  path?: string;
  imports?: IDoctorSourceParseResult["imports"];
  contents?: string;
}
