### 💡Contribution:

进入项目仓库<br>

```sh
# 请使用pnpm 8进行安装，避免依赖结构问题导致后续命令无法执行
pnpm i
npm run build:all
```

~~目前没有 `example` 目录 ，直接在 `packages/core` 里面新建了 `.doctor.ts` 配置文件，用来调试 `doctor web-tools` 命令~~<br>

已有 `examples/web-tools` 进行调试

```sh
cd examples/web-tools
npm run doctor:webtools
```

如果想要 编写新的 `feature`<br>
新开启一个终端 <br>

因为 monorepo 的缘故 无需手动 `link`,修改源码后 `examples` 中即可查看效果

```sh
cd packages/doctor-webtools
npm run dev

npm run doctor:webtools //记得回到 examples/webtools 中
```

#### 文档贡献指南:

位于 `website` 目录下 使用的是 `dumi + antd` 的主题包<br> 1.主要修改 `.dumirc.ts` 配置文件 即可 powered by antd 主题包<br>
2.md 编写 powered by dumi<br>

```sh
npm run start
```
