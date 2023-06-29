import { chalk, winPath } from "@umijs/utils";
import enhancedResolve from "enhanced-resolve";
import vm from "vm";
import type { ConfigSchema, IApi } from "../type";
import { DoctorLevel, DoctorMeta } from "@doctors/core";
import { getPkgNameFromPath } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorNpmPkgCheck(({ sourceFiles }) => {
    const userConfig = api.userConfig as ConfigSchema;
    const warns: DoctorMeta[] = [];
    const sandbox = vm.createContext({ require });
    let resolver: ReturnType<(typeof enhancedResolve)["create"]["sync"]>;

    if (!userConfig.npmPkg?.cjs) {
      return warns;
    }

    console.log(sourceFiles);

    sourceFiles?.forEach((file) => {
      file.imports?.forEach((i) => {
        resolver ??= enhancedResolve.create.sync({});
        const pkgName = getPkgNameFromPath(i.path);

        if (pkgName && i.kind === "import-statement") {
          try {
            const res = resolver(i.resolveDir, i.path);
            // 只检查npm包
            if (res && res.includes("node_modules")) {
              vm.runInContext(`require('${winPath(res)}')`, sandbox);
            }
          } catch (e: any) {
            if (e.code === "ERR_REQUIRE_ESM") {
              warns.push({
                label: "cjsImportEsm",
                description: `CommonJS file import an ES Module \`${
                  i.path
                }\`, it will cause \`ERR_REQUIRE_ESM\` error in Node.js runtime
                ${chalk.gray(
                  `at ${file.path}`
                )}, Please convert import to await import, or find a CommonJS version of the package`,
                doctorLevel:
                  userConfig.npmPkg?.cjsImportEsm?.level || DoctorLevel.ERROR,
              });
            }
          }
        }
      });
    });

    if (!warns.length) {
      return {
        label: "cjsImportEsm",
        description:
          "The output entity in the files field of the packages.json file is normal",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }

    return warns;
  });
};
