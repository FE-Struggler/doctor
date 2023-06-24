import { Service as CoreService } from "@umijs/core";
import path from "path";
import * as process from "process";
import { DEFAULT_CONFIG_FILES, FRAMEWORK_NAME } from "../constants";
import { getDoctorDependencies } from "../utils";

export class Service extends CoreService {
  constructor(opts?: any) {
    let cwd = process.cwd();
    const appRoot = process.env.APP_ROOT;

    if (appRoot) {
      cwd = path.isAbsolute(appRoot) ? appRoot : path.join(cwd, appRoot);
    }
    super({
      ...opts,
      env: process.env.NODE_ENV,
      cwd,
      defaultConfigFiles: DEFAULT_CONFIG_FILES,
      frameworkName: FRAMEWORK_NAME,
      presets: [
        ...getDoctorDependencies().map((i) => i.path + "/dist/index.js"),
      ],
    });
  }

  async run2(opts: { name: string; args?: any }) {
    let name = opts.name;
    if (opts?.args.version || name === "v") {
      name = "version";
    } else if (opts?.args.help || !name || name === "h") {
      name = "help";
    }

    return await this.run({ ...opts, name });
  }
}
