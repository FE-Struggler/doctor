import type { IApi } from "../type";
import type { DoctorMeta } from "@doctors/core";

// Project dependencies and peerDependencies repeat Times warnings
export default (api: IApi) => {
  api.addDoctorNpmPkgCheck(() => {
    const warns: DoctorMeta[] = [];

    if (api.pkg.peerDependencies && api.pkg.dependencies) {
      Object.keys(api.pkg.peerDependencies).forEach((pkg) => {
        if (
          api.pkg.dependencies![pkg] &&
          !api.userConfig?.pkg?.exclude?.includes(pkg)
        ) {
          warns.push({
            label: "dupInPeerDependences",
            description: `The package ${pkg} is both a peerDependency and a dependency,Please remove one from the package.json file base on project requirements`,
            doctorLevel: "warn",
          });
        }
      });
    }

    return warns;
  });
};
