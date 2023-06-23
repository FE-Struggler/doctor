### 💡Contribution:

进入项目仓库<br>

```sh
pnpm i
npm run build:all
```

目前没有 `example` 目录 ，直接在 `packages/core` 里面新建了 `.doctor.ts` 配置文件，用来调试 `doctor web-tools` 命令<br>

```sh
cd packages/core
npm link
doctor web-tools
```

调试 `@doctors/webtools` 预设 或者 编写新的 `feature`<br>
新开启一个终端

```sh
cd packages/doctor-webtools
npm run dev
doctor web-tools //记得回到另一个 有配置文件的目录终端中 (core)
```
