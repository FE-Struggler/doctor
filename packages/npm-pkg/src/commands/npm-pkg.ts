import { generatePreset } from "@doctors/core";
import type { Nullify } from "@doctors/core";
import { type IApi, type Meta } from "../type";
import { ConfigSchema } from "../type";
import { PRESET_NAME } from "../constants";
import { getFilesWithImports } from "../utils";

const schema: Nullify<ConfigSchema> = {
  npmPkg: {
    peerDepAndDepRepeat: {
      level: null,
      exclude: null,
    },
    checkPkgFilesExist: {
      level: null,
    },
    preferPackFiles: {
      level: null,
    },
    // 入口文件，如果不填默认扫描全部
    compileFiles: null,
    // 开启该选项表示项目为cjs规范，会启动cjs相关的检查
    // cjs添加其他字段 TODO
    cjs: {
      open: null,
      cjsImportEsm: {
        level: null,
      },
    },
  },
};

export default async (api: IApi) => {
  // meta 元数据 将会作为所有 feature 插件的实参传入 供使用
  const meta: Meta = {};

  const sourceFiles = await getFilesWithImports(api);

  meta.sourceFiles = sourceFiles;

  generatePreset({
    api,
    command: PRESET_NAME,
    schema,
    meta,
  });
};
