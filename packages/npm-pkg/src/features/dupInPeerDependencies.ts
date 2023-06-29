import type { ConfigSchema, IApi } from "../type";
import { DoctorLevel, DoctorMeta } from "@doctors/core";

// Project dependencies and peerDependencies repeat Times warnings
export default function depInPeerDependencies(api: IApi) {
  api.addDoctorNpmPkgCheck(() => {
    const userConfig = api.userConfig as ConfigSchema;
    const warns: DoctorMeta[] = [];

    if (api.pkg.peerDependencies && api.pkg.dependencies) {
      Object.keys(api.pkg.peerDependencies).forEach((pkg) => {
        if (
          api.pkg.dependencies![pkg] &&
          !userConfig.npmPkg?.peerDepAndDepRepeat?.exclude?.includes(pkg)
        ) {
          warns.push({
            label: "depInPeerDependencies",
            description: `The package ${pkg} is both a peerDependency and a dependency,Please remove one from the package.json file base on project requirements`,
            doctorLevel:
              userConfig.npmPkg?.peerDepAndDepRepeat?.level ||
              DoctorLevel.ERROR,
          });
        }
      });
    }

    if (!warns.length) {
      return {
        label: "depInPeerDependencies",
        description:
          "Package with duplicate peerDependencies and dependencies were not detected",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }

    return warns;
  });
}
