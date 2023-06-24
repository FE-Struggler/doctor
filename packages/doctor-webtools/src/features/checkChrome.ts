import { exec } from "child_process";
import { IApi } from "../type";
const os = require("os");
let str: string = "";
if (os.platform() === "darwin") {
  console.log("当前操作系统是 macOS");
  str =
    "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version";
} else if (os.platform() === "win32") {
  console.log("当前操作系统是 Windows");
  str =
    'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version';
} else {
  console.log("当前操作系统不是 macOS 也不是 Windows");
}

async function isChromeInstalled(): Promise<boolean> {
  try {
    const stdout: string = await execCommand(str);
    if (stdout.startsWith("Google Chrome") || stdout.includes("version")) {
      return true;
    }
    return false;
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
        doctorLevel: "success",
      };
    }
  });
};
