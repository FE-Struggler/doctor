import { IApi } from "src/types";
import { exec } from 'child_process'

async function isChromeInstalled(): Promise<boolean> {
  const stdout: string = await execCommand('sudo -S /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version') as string
  if (stdout.startsWith('Google Chrome')) {
    return true;
  }
  return false;
}

// 执行命令，并返回命令输出的结果
function execCommand(command: string) {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
    child.on('exit', (code) => {
      if (code === 127) { // command not found
        reject(new Error(`Command not found: ${command}`));
      }
    });
   
  });
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const res = await isChromeInstalled()
    if (res) {
      return {
        label: 'isChromeInstalled',
        description: 'You should apply Chrome for web development',
        type:'error'
      }
    }
  })

}
