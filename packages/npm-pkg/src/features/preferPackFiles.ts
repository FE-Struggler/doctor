import type { ConfigSchema, IApi } from "../type";
import { DoctorLevel, DoctorMeta } from "@doctors/core";

// Project dependencies and peerDependencies repeat Times warnings
export default function depInPeerDependencies(api: IApi) {
  const userConfig = api.userConfig as ConfigSchema;
  api.addDoctorNpmPkgCheck(() => {
    if (!api.pkg.files) {
      return {
        label: "preferPackFiles",
        description:
          "No `files` field in the package.json file, all the non-gitignore files will be published",
        doctorLevel:
          userConfig.npmPkg?.preferPackFiles?.level || DoctorLevel.WARN,
      };
    }

    return {
      label: "preferPackFiles",
      description: "`files` field is in the package.json file",
      doctorLevel: DoctorLevel.SUCCESS,
    };
  });
}
