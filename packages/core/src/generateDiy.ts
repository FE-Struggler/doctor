import { IApi } from "./types";

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
      let hasError = false;
      const { spawn } = require("node-pty");
      //npx doctor web-tools -s && npx doctor npm-pkg -s
      async function run() {
        const commands = diyCommands;
        for (const command of commands) {
          const ptyProcess = spawn("npx", ["doctor", command, "-s"]);

          let output = "";

          ptyProcess.on("data", function (data) {
            output += data;
            process.stdout.write(data);
          });

          await new Promise((resolve) => {
            ptyProcess.on("exit", (code) => {
              if (code === 1) {
                hasError = true;
              }
              resolve(void 0);
            });
          });
        }
      }
      await run();
      if (hasError) {
        process.exit(1);
      }
    },
  });

  return {
    presets,
    ...restProps,
  };
}
