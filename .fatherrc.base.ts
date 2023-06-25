import { defineConfig } from "father";
import { alias } from "./alias";

export default defineConfig({
  cjs: {
    output: "./dist",
    alias,
  },
  prebundle: {
    deps: {},
  },
});
