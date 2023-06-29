import { IApi } from "@doctors/core";
import { globSync } from "glob";
import path from "path";
import fs from "fs";
import lodash from "lodash";
import sourceParser, { IDoctorSourceParseResult } from "./parser";
import { DEFAULT_SOURCE_IGNORES } from "./constants";

export interface SourceFile {
  path?: string;
  imports?: IDoctorSourceParseResult["imports"];
  contents?: string;
}

export function getSourceDirs(files: string[]) {
  const configDirs = lodash.uniq([...files.map((c) => path.dirname(c))]);

  return configDirs;
}

export function getSourceFiles(api: IApi) {
  let files: string[] = [];
  let compileFiles: string[] = [];

  if (api.userConfig?.npmPkg?.compileFIles) {
    compileFiles = Array.isArray(api.userConfig?.npmPkg?.compileFIles)
      ? api.userConfig?.npmPkg?.compileFiles
      : [api.userConfig?.npmPkg?.compileFiles];
  }

  if (compileFiles.length) {
    compileFiles.forEach((e) => {
      globSync(e, {
        cwd: api.cwd,
        ignore: DEFAULT_SOURCE_IGNORES,
        nodir: true,
      }).forEach((file) => {
        files.push(file);
      });
    });
  } else {
    files = globSync("**/*.{ts,js}", {
      cwd: api.cwd,
      ignore: DEFAULT_SOURCE_IGNORES,
      nodir: true,
    });
  }

  const sourceDirs = getSourceDirs(files);

  const allFiles: string[] = sourceDirs.reduce<string[]>(
    (ret: string[], dir: string) =>
      ret.concat(
        globSync(`${dir}/**/*.{ts,js}`, {
          cwd: api.cwd,
          ignore: DEFAULT_SOURCE_IGNORES,
          nodir: true,
        })
      ),
    []
  );

  return Array.from(new Set(allFiles)) || [];
}

export async function getFilesWithImports(api: IApi) {
  const files: string[] = getSourceFiles(api);

  let sourceFiles: SourceFile[];

  sourceFiles = await Promise.all(
    files.map(async (file) => {
      return {
        path: file,
        imports: (await sourceParser(path.join(api.cwd, file))).imports,
        content: fs.readFileSync(path.join(api.cwd, file), "utf-8"),
      };
    })
  );

  return sourceFiles;
}
