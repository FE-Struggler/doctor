import { resolve } from "node:path";

function r(p: string) {
  return resolve(__dirname, p);
}

export const alias: Record<string, string> = {
  "@doctors/core": r("./packages/core/src/"),
  "@doctors/webtools": r("./packages/web-tools/src/"),
  "@doctors/npmpkg": r("./packages/npm-pkg/src/"),
  "@doctors/utils": r("./packages/utils/src/"),
};
