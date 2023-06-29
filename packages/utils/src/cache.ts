import { CACHE_PATH } from "./constants";
import Cache from "file-system-cache";
import path from "path";

const caches: Record<string, ReturnType<typeof Cache>> = {};

export function getCache(ns: string): (typeof caches)["0"] {
  // return fake cache if cache disabled
  if (process.env.FATHER_CACHE === "none") {
    return { set() {}, get() {}, setSync() {}, getSync() {} } as any;
  }
  return (caches[ns] ??= Cache({ basePath: path.join(CACHE_PATH, ns) }));
}
