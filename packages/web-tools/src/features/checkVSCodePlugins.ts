import { IApi } from "@doctors/core";
import { exec } from "child_process";
import { chalk } from "@umijs/utils";

/*  VSCode plugins type */
export type VSCodePluginsConfig = (
  | string
  | { name: string; desc: string; version?: string }
)[];

/* Constants */
const FEATURE_NAME = "VSCode Plugins";
const BASIC_VSCODE_PLUGINS: VSCodePluginsConfig = [];
const OUTPUT_DEMARCATORS = "\n\t- ";

/**
 * Execute command
 */
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

async function filterPluginsConfig(
  plugins: VSCodePluginsConfig
): Promise<[string[], string[]]> {
  const failedRecords: string[] = [];
  const successRecords: string[] = [];

  try {
    const localPluginsMap = await getLocalPlugins();
    plugins.forEach((item) => {
      if (typeof item === "string" && !localPluginsMap.has(item)) {
        const name = item;
        failedRecords.push(`Miss Plugin: You should install ${name} plugin`);
      } else if (typeof item === "object" && item !== null) {
        const { name, desc, version: targetVersion } = item;
        if (!localPluginsMap.has(name)) {
          failedRecords.push(
            `Miss Plugin: You should install ${name}@${targetVersion} plugin`
          );
        } else {
          // check version
          if (targetVersion != null) {
            const localVersion = localPluginsMap.get(name) as string;
            if (compareVersion(localVersion, targetVersion) < 0) {
              failedRecords.push(
                `Low Version: You should update the ${name} plugin to version v${targetVersion} and above.  Now: v${localVersion}`
              );
            }
          }
          successRecords.push(`Pass ${name} Plugin: ${desc}`);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }

  return [failedRecords, successRecords];
}

/**
 * Get local VSCode plugins
 */
async function getLocalPlugins() {
  const stdout =
    (await execCommand("code --list-extensions --show-versions")) || "";
  const pluginMap = stdout.split("\n").reduce((map, item) => {
    const [name, version] = item.split("@");
    map.set(name, version);
    return map;
  }, new Map<string, string>());
  return pluginMap;
}

/**
 * Compare version numbers
 */
function compareVersion(a: string, b: string) {
  const versionReg = /^\d+?(\.\d+){0,2}$/;
  if (!versionReg.test(a) || !versionReg.test(b)) {
    throw TypeError(
      `There is an error in the version resolution of the VSCode plugin ${
        versionReg.test(a) ? b : a
      }, please make sure you have configured the version number in the correct format`
    );
  }
  let aV = a.split(".").map(Number),
    bV = b.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (aV[i] == null || bV[i] == null) {
      if (aV[i] == null) return -1;
      else return 1;
    }
    if (aV[i] > bV[i]) {
      return 1;
    } else if (aV[i] < bV[i]) {
      return -1;
    }
  }
  return 0;
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const vscodePlugins: VSCodePluginsConfig = [
      ...BASIC_VSCODE_PLUGINS,
      ...(api.userConfig.tools?.vscode?.morePlugins || []),
    ];

    const [failedRecords, successRecords] = await filterPluginsConfig(
      vscodePlugins
    );

    if (failedRecords.length === 0) {
      let description =
        successRecords.length === 0
          ? "You have installed all the required VSCode plugins"
          : `${OUTPUT_DEMARCATORS}${successRecords.join(OUTPUT_DEMARCATORS)}\n`;
      return {
        label: FEATURE_NAME,
        description,
        doctorLevel: "success",
      };
    } else {
      return {
        label: FEATURE_NAME,
        description: `${OUTPUT_DEMARCATORS}${failedRecords.join(
          OUTPUT_DEMARCATORS
        )}\n`,
        doctorLevel: "error",
      };
    }
  });
};
