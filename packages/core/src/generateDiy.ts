import { IApi } from "./types";
const { spawn } = require("child_process");

interface GenerateDiyProps {
  api: IApi;
  presets: string[];
  commands: string[];
}
export default function generateDiy({
  api,
  presets,
  commands: diyCommands,
  ...restProps
}: GenerateDiyProps) {
  api.registerCommand({
    name: "diy",
    async fn() {
      const { spinner: load } = await import("@astrojs/cli-kit");
      let hasError = false;
      let output: string[] = [];
      async function run() {
        const commands = diyCommands;
        for (const command of commands) {
          const ptyProcess = await spawn(
            "npx",
            ["doctor", command, "-s", "--color"],
            { stdio: "pipe" }
          );
          if (ptyProcess && ptyProcess.stdout) {
            ptyProcess.stdout.on("data", function (data) {
              output.push(data);
            });
          }
          await new Promise((resolve) => {
            if (ptyProcess) {
              ptyProcess.on("exit", (code) => {
                if (code === 1) {
                  hasError = true;
                }
                resolve(void 0);
              });
            }
          });
        }
      }
      await load({
        start: "Doctor Rules Checking ",
        end: "Check end",
        while: () => {
          return run();
        },
      });
      function printOutput(index) {
        if (index < output.length) {
          process.stdout.write(output[index]);
          setTimeout(() => printOutput(index + 1), 100);
        } else {
          if (hasError) {
            process.exit(1);
          }
        }
      }

      printOutput(0);
    },
  });

  return {
    presets,
    ...restProps,
  };
}
