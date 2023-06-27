# 使用 脚手架 快速生成 doctor preset 模板

> 暂未发布 npm

可创建预设，或在已有的基础上创建 feature

- 创建预设

```sh
npx create-doctor <preset-name>
```

选择 preset，然后根据提示进行输入

- 创建 feature

在项目根目录执行

```sh
npx create-doctor
```

选择 feature，然后根据提示进行输入

脚手架会自动在 `src/features/index.ts` 中导入 feature
