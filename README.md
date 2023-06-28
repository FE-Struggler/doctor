### 💡Contribution:

进入项目仓库<br>

```sh
# 请使用pnpm 8进行安装，避免依赖结构问题导致后续命令无法执行
pnpm i
npm run build:all
```

> windows 下开发时，安装依赖如果出现问题，请参考[windows 开发注意事项](#windows开发注意事项)

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
cd packages/web-tools
npm run dev

npm run doctor:webtools //记得回到 examples/webtools 中
```

#### 文档贡献指南:

位于 `website` 目录下 使用的是 `dumi + antd` 的主题包<br> 1.主要修改 `.dumirc.ts` 配置文件 即可 powered by antd 主题包<br>
2.md 编写 powered by dumi<br>

```sh
npm run start
```

#### windows 开发注意事项:

windows 环境下开发可能会遇到一些问题，可以参考：

1. 确保 node 版本为 16+，pnpm 版本为 8+
2. 部分命令报错时（如`sh`, `rm -rf`等）请使用能够支持这些 shell 的终端运行命令，比如`git-bash`，`zsh`等
3. 依赖下载失败时，考虑切换下载源，开启管理员模式后重试
4. 提示`doctor`等依赖缺失时，请尝试 `pnpm i`, `doctor`命令由本地的 `@doctors/core` 提供,请检查是否正确使用 monorepo 模式开发
