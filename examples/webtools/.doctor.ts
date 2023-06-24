import { DoctorLevel } from "@doctors/core";
import { defineConfig } from "@doctors/webtools";

export default defineConfig({
  tools: {
    nodeVersion: DoctorLevel.ERROR,
  },
});
