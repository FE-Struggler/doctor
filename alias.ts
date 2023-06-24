import { resolve } from "node:path";

function r(p: string) {
  return resolve(__dirname, p);
}

export const alias: Record<string, string> = {
  "@doctors/webtools": r("./packages/doctor-webtools/src/"),
  "@doctors/core": r("./packages/core/src/"),
};
