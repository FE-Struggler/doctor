import { globSync } from "glob";
import path from "path";
import fs from "fs";
import lodash from "lodash";
import sourceParser, { type IDoctorSourceParseResult } from "./parser";
import { DEFAULT_SOURCE_IGNORES } from "./constants";

export interface SourceFile {
  path?: string;
  imports?: IDoctorSourceParseResult["imports"];
  contents?: string;
}

export function getPkgNameFromPath(p: string) {
  return p.match(/^(?:@[a-z\d][\w-.]*\/)?[a-z\d][\w-.]*/i)?.[0];
}

export function getSourceDirs(files: string[]) {
  const configDirs = lodash.uniq([...files.map((c) => path.dirname(c))]);

  return configDirs;
}

export function getSourceFiles(compileFiles: string[], cwd: string) {
  let files: string[] = [];

  if (compileFiles.length) {
    compileFiles.forEach((e) => {
      globSync(e, {
        cwd,
        ignore: DEFAULT_SOURCE_IGNORES,
        nodir: true,
      }).forEach((file) => {
        files.push(file);
      });
    });
  } else {
    files = globSync("**/*.{ts,js}", {
      cwd,
      ignore: DEFAULT_SOURCE_IGNORES,
      nodir: true,
    });
  }

  const sourceDirs = getSourceDirs(files);

  let allFiles: string[] = sourceDirs.reduce<string[]>(
    (ret: string[], dir: string) =>
      ret.concat(
        globSync(`${dir}/**/*.{ts,js}`, {
          cwd,
          ignore: DEFAULT_SOURCE_IGNORES,
          nodir: true,
        })
      ),
    []
  );

  allFiles = [...new Set(allFiles)];

  return allFiles;
}

export async function getFilesWithImports(
  compileFiles: string[],
  AbsDir: string
) {
  const files: string[] = getSourceFiles(compileFiles, AbsDir);

  let sourceFiles: SourceFile[];

  sourceFiles = await Promise.all(
    files.map(async (file) => {
      return {
        path: file,
        imports: (await sourceParser(path.join(AbsDir, file))).imports,
        content: fs.readFileSync(path.join(AbsDir, file), "utf-8"),
      };
    })
  );

  return sourceFiles;
}

export function getMonorepoSonPackages(workSpaces: string[], cwd: string) {
  const packAgeJsonFiles: string[] = [];
  workSpaces.forEach((workSpace) => {
    packAgeJsonFiles.push(
      ...globSync(workSpace + "/**/*.json", {
        cwd,
        ignore: DEFAULT_SOURCE_IGNORES,
        nodir: true,
      }).filter((jsonFile) => {
        return jsonFile.endsWith("package.json");
      })
    );
  });

  const packages = getSourceDirs(packAgeJsonFiles);

  return packages;
}
