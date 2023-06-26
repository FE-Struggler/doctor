import { exec } from "child_process";
const os = require("os");
import { IApi } from "../type";
import { DoctorLevel } from "@doctors/core";

let str: string = "";
if (os.platform() === "darwin") {
  str =
    "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version";
} else if (os.platform() === "win32") {
  str =
    'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version';
}

async function isChromeInstalled(): Promise<boolean> {
  try {
    const stdout: string = await execCommand(str);
    return stdout.startsWith("Google Chrome") || stdout.includes("version");
  } catch (error) {
    console.error(error);
    return false;
  }
}

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

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const res = await isChromeInstalled();
    if (res) {
      return {
        label: "isChromeInstalled",
        description: "You should apply Chrome for web development",
        doctorLevel: DoctorLevel.SUCCESS,
      };
    }
  });
};
