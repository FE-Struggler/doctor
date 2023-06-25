import { resolve } from "node:path";

function r(p: string) {
  return resolve(__dirname, p);
}

export const alias: Record<string, string> = {
  "@doctors/core": r("./packages/core/src/"),
  "@doctors/webtools": r("./packages/doctor-webtools/src/"),
  "@doctors/shared": r("./packages/shared/src/"),
  "@doctors/npmpkg": r("./packages/doctor-npm-pkg/src/"),
};
