import type { ConfigSchema, IApi } from "../type";
import { DoctorLevel, DoctorMeta } from "@doctors/core";
import path from "path";
import fs from "fs";
import { globSync } from "glob";

const outputFileType = ["js", "jsx", "ts", "tsx", "html", "css"];

export default (api: IApi) => {
  api.addDoctorNpmPkgCheck(() => {
    const userConfig = api.userConfig as ConfigSchema;
    const absolutePath: string[] = [];
    const warns: DoctorMeta[] = [];

    api.pkg.files?.forEach((file: string) => {
      absolutePath.push(path.join(api.cwd, file));
    });

    if (!absolutePath.length) {
      return;
    }

    for (let path of absolutePath) {
      if (fs.existsSync(path)) {
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
          const files = globSync(path + `/*.{${outputFileType.join(",")}}`);
          if (!files.length) {
            warns.push({
              label: "checkPkgFilesExist",
              description: `The output entity \'${path}\` is in the \`files\` field of the package.json but the directory is empty, please check whether the package is successfully packaged`,
              doctorLevel:
                userConfig.npmPkg?.checkPkgFilesExist?.level ||
                DoctorLevel.ERROR,
            });
          }
        }
      } else if (/^.*\*\.[a-zA-Z0-9]+$/.test(path)) {
        const files = globSync(path);
        if (!files.length) {
          warns.push({
            label: "checkPkgFilesExist",
            description: `The output entity \'${path}\` is in the \`files\` field of the package.json but the directory is No file name extension is specified in the folder, please check whether the package is successfully packaged`,
            doctorLevel:
              userConfig.npmPkg?.checkPkgFilesExist?.level || DoctorLevel.ERROR,
          });
        }
      } else {
        warns.push({
          label: "checkPkgFilesExist",
          description: `The output entity \'${path}\` is in the \`files\` field of the package.json file but no exist, please check whether the package is successfully packaged`,
          doctorLevel:
            userConfig.npmPkg?.checkPkgFilesExist?.level || DoctorLevel.ERROR,
        });
      }
    }

    if (!warns.length) {
      return {
        label: "checkPkgFilesExist",
        description:
          "The output entity in the files field of the packages.json file is normal",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }

    return warns;
  });
};
