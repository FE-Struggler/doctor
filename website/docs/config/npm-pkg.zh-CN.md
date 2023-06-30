---
title: NPM 类库研发
order: 2
nav:
  title: 文档
  order: 2
---

# `@doctors/npm-pkg`

为了更好地满足自定义诉求，增加了一些特有字段，具体配置字段如下：

## Config Schema 💻

```ts
interface ConfigSchema {
  npmPkg?: {
    peerDepAndDepRepeat?: {
      level?: DoctorLevel;
      exclude?: string[];
    };
    checkPkgFilesExist?: {
      level?: DoctorLevel;
    };
    preferPackFiles?: {
      level?: DoctorLevel;
    };
    compileFiles?: string | string[];
    cjs?: {
      open: boolean;
      cjsImportEsm?: {
        level?: DoctorLevel;
      };
    };
  };
}
```

### DoctorLevel

| Level | 类型              | 描述                        |
| ----- | ----------------- | --------------------------- |
| off   | DoctorLevel.OFF   | 关闭此条 doctor rule 的检测 |
| warn  | DoctorLevel.WARN  | WARN 等级，不会打断后续进程 |
| error | DoctorLevel.ERROR | Error 等级 打断后续进程     |

## 基础配置

### nodeVersion

- 类型：DoctorLevel
- 默认值：DoctorLevel.WARN

检测当前 Node 版本

### gitSshKey

- 类型：DoctorLevel
- 默认值：DoctorLevel.WARN

检测 gitSshKey 是否正确配置
