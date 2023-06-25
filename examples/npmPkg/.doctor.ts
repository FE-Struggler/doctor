import { defineConfig } from "@doctors/npmpkg";

export default defineConfig({
  pkg: {
    exclude: ["@doctors/core"],
  },
});
