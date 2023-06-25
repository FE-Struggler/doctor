import { defineConfig } from "@doctors/npm-pkg";

export default defineConfig({
  pkg: {
    exclude: ["@doctors/core"],
  },
});
