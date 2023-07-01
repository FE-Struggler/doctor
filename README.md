<br>

<h1 align="center">Doctors - For Web Development</h1>

<h2 align="center">
研发质量保障的好帮手
</h2>

<br>
<p align="center">
<a href="https://doctor-delta.vercel.app/">📚 官方文档</a>
</p>
<br>

## 上手尝试

在本项目的目录打开 `terminal`

```sh
# 构建
pnpm i # 请使用 pnpm 8
npm run build:all

# 使用示例
cd examples/web-tools
npm run test
```

`examples/diy` 整合了目前已有的绝大部分 rules

```sh
cd examples/diy
npm run test
```

<br>

## 开发指南

### 入门案例

对 `web-tools` 进行 `feature` 开发。

```sh
cd packages/web-tools
npm run dev
```

开启 `dev` 之后，修改该目录下代码会自动更新。本项目是 `Monorepo` 架构，因此可以直接在 `examples/web-tools` 下直接运行 `npm run doctor:webtools` 进行调试。

如果想为其添加新 `feature`，请参照 `packages/web-tools/src/features` 中的代码格式，如下。

```ts
// `packages/web-tools/src/features/checkXxx.ts`
export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    // 你的判断逻辑
    return {
      label: "{{feature-name}}",
      description: "{{description}}",
      // 提示信息等级 ENUM: OFF | WARN | SUCCESS | ERROR
      doctorLevel: DoctorLevel.WARN,
    };
  });
};
```

并将其统一受 `features/index.ts` 中暴露。

```ts
export default [...+require.resolve("./checkXxx")];
```

### 开发一个新的 doctor

打开 `terminal`，按如下步骤（无需在本项目的 `packages` 下开发）

```sh
mkdir doctor-xxx
cd doctor-xxx
npx create-doctor
```

选择 **`preset`**，并根据提示输入即可。

配置可参照 `packages/web-tools`。

开发进行时同样可以使用

```sh
npm run dev
```

为了能够快速 `debug`，建议以 `Monorepo` 的形式开发，如本项目中的 `examples` 目录。

### Windows 开发注意事项

windows 环境下开发可能会遇到一些问题，可以参考：

1. 确保 node 版本为 16+，pnpm 版本为 8+
2. 部分命令报错时（如`sh`, `rm -rf`等）请使用能够支持这些 shell 的终端运行命令，比如`git-bash`，`zsh`等
3. 依赖下载失败时，考虑切换下载源，开启管理员模式后重试
4. 提示`doctor`等依赖缺失时，请尝试 `pnpm i`, `doctor`命令由本地的 `@doctors/core` 提供,请检查是否正确使用 `Monorepo` 模式开发

<br>

## 文档贡献

本项目文档基于 **`dumi` + `Ant Design`主题包** 开发。

进入`website/`，可做如下工作

1. 修改 `.dumirc.ts` 配置文件。`Powered by And Design`主题包。
2. 编写 `Markdown` 文档。`Powered by dumi`。

启动

```sh
npm run start
```
