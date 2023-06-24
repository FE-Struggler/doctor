import { IApi } from "@doctors/core";
import { exec } from "child_process";
import { chalk } from "@umijs/utils";

const FEATURE_NAME = "includesVSCodePlugins";

function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });

    child.on("close", () => {
      child.kill();
    });
  });
}

async function includesPlugins(plugins: string[]): Promise<string[]> {
  const lackList: string[] = [];
  try {
    const stdout = (await execCommand("code --list-extensions")) || "";
    const pluginList = stdout.split("\n");
    plugins.forEach((item) => {
      if (!pluginList.includes(item)) {
        lackList.push(item);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return lackList;
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const vscodePlugins = api.userConfig.tools?.vscodePlugins || [];

    const lackPlugins =
      vscodePlugins.length !== 0
        ? await includesPlugins(vscodePlugins)
        : vscodePlugins;

    if (lackPlugins.length === 0) {
      return {
        label: FEATURE_NAME,
        description: "You should install the VSCode development plugin",
        doctorLevel: "success",
      };
    } else {
      return {
        label: FEATURE_NAME,
        description: `You are missing the following plugins: ${chalk.red(
          lackPlugins
        )}`,
        doctorLevel: "error",
      };
    }
  });
};
