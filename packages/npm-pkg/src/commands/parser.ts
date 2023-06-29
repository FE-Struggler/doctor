import { build, type OnResolveArgs } from "esbuild";
import fs from "fs";
import path from "path";
import { getCache } from "@doctors/utils";

export type IDoctorSourceParseResult = {
  imports: Omit<OnResolveArgs, "pluginData">[];
};

export default async (
  fileAbsPath: string
): Promise<IDoctorSourceParseResult> => {
  const cache = getCache("doctor-parser");
  // format: {path:mtime}
  const cacheKey = [fileAbsPath, fs.statSync(fileAbsPath).mtimeMs].join(":");
  const cacheRet = cache.getSync(cacheKey, "");
  const ret: IDoctorSourceParseResult = { imports: [] };

  if (cacheRet) return cacheRet;

  await build({
    // 不写入磁盘，扫描文件收集元信息供features使用
    write: false,
    // 触发onResolve hook
    bundle: true,
    logLevel: "silent",
    format: "esm",
    target: "esnext",
    // esbuild need relative entry path
    entryPoints: [path.basename(fileAbsPath)],
    absWorkingDir: path.dirname(fileAbsPath),
    plugins: [
      {
        name: "plugin-scanning-doctor",
        setup: (builder) => {
          builder.onResolve({ filter: /.*/ }, ({ pluginData, ...args }) => {
            if (args.kind !== "entry-point") {
              ret.imports.push(args);

              return {
                path: args.path,
                // make all deps external
                external: true,
              };
            }
          });
        },
      },
    ],
  });

  cache.set(cacheKey, ret);

  return ret;
};
