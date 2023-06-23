import { defineConfig } from "./src/defineConfig";
import { DoctorLevel } from "./src/types";

export default defineConfig({
  tools: {
    nodeVersion: DoctorLevel.WARN
  }
})
