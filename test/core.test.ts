import { describe, it, expect } from "vitest";
import { defineConfig, DoctorLevel } from "@doctors/core";
import type { IDoctorConfig } from "@doctors/core";

describe("defineConfig", () => {
  it("should return raw config", () => {
    const rawConfig: IDoctorConfig = {
      tools: { nodeVersion: DoctorLevel.OFF },
    };

    const config = defineConfig(rawConfig);

    expect(config).toEqual(rawConfig);
  });
});
