---
title: Preset 定制化
order: 2
nav:
  title: 指南
group:
  title: 进阶特性
  order: 3
---

## 适用场景

`NPM 类库研发` 是指开发和维护在 NPM（Node Package Manager）平台上发布的 JavaScript 类库。这些类库通常提供了一些常用的功能或工具函数，可以被其他开发者在他们的 Web 应用程序中使用。

## Why is Doctor ❓

从前端基础工具类库研发的全流程角度来看，对 NPM 类库研发进行检测的必要性非常重要，主要包括以下几个方面：

- 配置检查：在进行 NPM 类库研发之前，需要对 npm 包的各种配置字段进行检查。例如，检查 package.json 文件中的最佳配置字段、入口文件、依赖关系等是否正确，以确保类库可以在其他应用程序中被正确安装和使用。

- 构建打包检查：在进行 NPM 类库研发时，通常需要进行构建和打包操作，以生成可发布的代码。在这个过程中，需要对构建和打包过程进行检查，确保生成的代码可以被正确地加载和使用。

- 发包检查：在进行 NPM 类库研发时，需要将生成的代码发布到 NPM 平台上，以供其他开发者使用。在这个过程中，需要对发布过程进行检查，确保发布的版本号、许可证和依赖关系等信息都是正确的。

- 测试检查：在进行 NPM 类库研发时，需要编写和运行各种测试，以确保类库的功能和性能都是正确的。因此，需要对测试代码和测试结果进行检查，确保测试覆盖率足够高，测试结果正确可靠。

## 快速开始

请先进入你的 npm pkg 仓库，推荐：Babel、Tsc、Swc、Father 等

```sh
npm i @doctors/npm-pkg
doctor web-tools
```

## 配置文件 `.doctor.[ts|js]`

[详细配置见](/config/npm-pkg)

## 最佳实践

publish 操作之前进行 doctor 质量检测

```diff
+ "scripts":{
-   "prepublishOnly": "npm run build"
+   "prepublishOnly": "doctor npm-pkg && npm run build"
+ }
```
