import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { chalkByDoctorLevel } from "@doctors/utils";
import { execCommand } from "@doctors/utils";

const commonRegistryHosts = [
  "registry.npmjs.org", // npm
  "registry.yarnpkg.com", // yarn
  "mirrors.cloud.tencent.com", // tencent
  "r.cnpmjs.org", // cnpm
  "registry.npmmirror.com", // taobao
  "skimdb.npmjs.com", // npmMirror
];

const deprecatedRegistryHosts = [
  "registry.npm.taobao.org", // taobao
];

async function getCurrentRegistry(packageManager: string) {
  try {
    const registry = await execCommand(`${packageManager} config get registry`);
    return registry;
  } catch (err) {
    return undefined;
  }
}

function getEachLevel(currentRegistry?: string): DoctorLevel {
  let level = DoctorLevel.WARN;
  if (!currentRegistry) {
    return level;
  }
  deprecatedRegistryHosts.forEach((registry) => {
    if (currentRegistry.includes(registry)) level = DoctorLevel.ERROR;
  });
  commonRegistryHosts.forEach((registry) => {
    if (currentRegistry.includes(registry)) level = DoctorLevel.SUCCESS;
  });
  return level;
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const ruleLevel = (api.userConfig.tools?.nodeVersion ||
      DoctorLevel.WARN) as DoctorLevel;

    if (ruleLevel === DoctorLevel.OFF) return;
    const registries = [
      await getCurrentRegistry("npm"),
      await getCurrentRegistry("yarn"),
      await getCurrentRegistry("pnpm"),
    ];
    //  Array<string> = [npmRegistry, yarnRegistry, pnpmRegistry];

    const eachLevel = registries.map((registry) => getEachLevel(registry));

    let overallLevel = DoctorLevel.SUCCESS;
    if (eachLevel.includes(DoctorLevel.ERROR)) {
      overallLevel = DoctorLevel.ERROR;
    } else if (eachLevel.includes(DoctorLevel.WARN)) {
      overallLevel = DoctorLevel.WARN;
    }

    return {
      label: "Package Manager Registry",
      description: `Registry should be stable and recognized: \n\n${chalkByDoctorLevel(
        eachLevel[0],
        ` NPM Registry: ${registries[0]}`
      )}\n${chalkByDoctorLevel(
        eachLevel[1],
        ` YARN Registry: ${registries[1]}`
      )}\n${chalkByDoctorLevel(
        eachLevel[2],
        ` PNPM Registry: ${registries[2]}`
      )}`,
      doctorLevel: overallLevel,
    };
  });
};
