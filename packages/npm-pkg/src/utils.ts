import { IApi } from "@doctors/core";
import { globSync } from "glob";
import path from "path";
import fs from "fs";
import sourceParser, { IDoctorSourceParseResult } from "./parser";

export interface SourceFile {
  path?: string;
  imports?: IDoctorSourceParseResult["imports"];
  contents?: string;
}

export function getSourceFiles(api: IApi) {
  let files: string[] = [];
  const entry: string[] = Array.isArray(api.userConfig?.npmPkg?.entry)
    ? api.userConfig?.npmPkg?.entry
    : [api.userConfig?.npmPkg?.entry];

  if (entry.length) {
    entry.forEach((e) => {
      globSync(e, {
        cwd: api.cwd,
        ignore: ["**/node_modules/**"],
        nodir: true,
      }).forEach((file) => {
        files.push(file);
      });
    });
  } else {
    files = globSync("**/*.{ts,js}", {
      cwd: api.cwd,
      ignore: ["**/node_modules/**"],
      nodir: true,
    });
  }

  return files;
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
