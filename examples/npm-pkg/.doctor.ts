import { defineConfig } from "@doctors/npm-pkg";

export default defineConfig({
  npmPkg: {
    peerDepAndDepRepeat: {
      level: "warn",
      exclude: ["@doctors/core"],
    },
  },
});
