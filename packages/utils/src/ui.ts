import { chalk } from "@umijs/utils";
import { DoctorLevel } from "@doctors/core";
import os from "os";

export function chalkByDoctorLevel(doctorLevel: DoctorLevel, chalkStr: string) {
  switch (doctorLevel) {
    case DoctorLevel.SUCCESS:
      return chalk.green(chalkStr);
    case DoctorLevel.WARN:
      return chalk.yellowBright(chalkStr);
    case DoctorLevel.ERROR:
      return chalk.red(chalkStr);
  }
}

export const enum CheckChromeInstalledCommands {
  darwin = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version",
  win32 = 'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version',
}

export function getCheckChromeCommandByOS() {
  if (os.platform() === "darwin") {
    return CheckChromeInstalledCommands.darwin;
  } else if (os.platform() === "win32") {
    return CheckChromeInstalledCommands.win32;
  }
}
