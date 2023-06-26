import { expect, test } from "vitest";
import { ConfigSchema, defineConfig } from "@doctors/npm-pkg";
import { DoctorLevel } from "@doctors/core";

test("define config should return raw config", async () => {
  const rawConfig: ConfigSchema = {
    npmPkg: {
      peerDepAndDepRepeat: {
        level: DoctorLevel.WARN,
        exclude: ["@doctors/core"],
      },
    },
  };

  const config = defineConfig(rawConfig);

  expect(config).equal(rawConfig);
});
