import { DoctorLevel } from "@doctors/core";
import { defineConfig } from "@doctors/web-tools";

export default defineConfig({
  tools: {
    nodeVersion: DoctorLevel.ERROR,
  },
});
