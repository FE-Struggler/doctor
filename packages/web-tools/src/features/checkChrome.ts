import { exec } from "child_process";
import { IApi } from "../type";
import { DoctorLevel } from "@doctors/core";
import { execCommand } from "@doctors/utils";
import os from "os";

export const enum CheckChromeInstalledCommands {
  darwin = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version",
  win32 = 'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version',
}

function getCheckChromeCommandByOS() {
  if (os.platform() === "darwin") {
    return CheckChromeInstalledCommands.darwin;
  } else if (os.platform() === "win32") {
    return CheckChromeInstalledCommands.win32;
  }
}

const command = getCheckChromeCommandByOS();

async function isChromeInstalled(): Promise<boolean> {
  try {
    const stdout: string = await execCommand(command as string);
    return stdout.startsWith("Google Chrome") || stdout.includes("version");
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const isInstalled = await isChromeInstalled();

    if (isInstalled) {
      return {
        label: "isChromeInstalled",
        description: "You should apply Chrome for web development",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }
  });
};
