import { defineConfig } from "dumi";
import type { SiteThemeConfig } from "dumi-theme-antd-style";
import path from "path";

import { homepage, name } from "../package.json";

import { featuresZh } from "./config/features";

const isProd = process.env.NODE_ENV === "production";

const themeConfig: SiteThemeConfig = {
  name: "Doctor",
  logo: "https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png",

  hero: {
    "zh-CN": {
      description: "Doctor - 你的研发质量保障",
      actions: [
        {
          type: "primary",
          text: "开始使用",
          link: "/guide",
        },
        {
          text: "Github",
          link: "https://github.com/FE-Struggler/doctor",
          openExternal: true,
        },
      ],
      features: featuresZh,
    },
    "en-US": {
      description: "dumi2 theme similar to antd v5 website",
      actions: [
        {
          type: "primary",
          text: "Start",
          link: "/guide-en",
        },
        {
          text: "Config",
          link: "/config-en",
        },
      ],
    },
  },
  socialLinks: { github: homepage },
  apiHeader: {
    pkg: name,
    sourceUrl: `{github}/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `{github}/tree/master/example/docs/components/{atomId}.{locale}.md`,
  },
  footer: "Made with ❤️ by every FE Struggler",
};

export default defineConfig({
  themeConfig,
  html2sketch: {},
  favicons: [
    "https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png",
  ],
  locales: [
    { id: "zh-CN", name: "中文", suffix: "" },
    { id: "en-US", name: "English", suffix: "-en" },
  ],
  alias: {
    "dumi-theme-antd-style": path.join(__dirname, "../src"),
  },
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
  ],
  codeSplitting: {
    jsStrategy: "granularChunks",
  },
  // @ts-ignore
  ssr: isProd ? {} : false,
});
