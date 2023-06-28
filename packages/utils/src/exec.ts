import { exec } from "child_process";

export function execCommand(command: string): Promise<string> {
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
