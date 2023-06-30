import { prompts, BaseGenerator, yParser, getGitInfo } from "@umijs/utils";
import { join } from "path";
import { rename } from "fs/promises";
import { isKebabCase, kebabToCamelCase, promptsWithCancel } from "./utils";

enum ETemplate {
  preset = "preset",
  feature = "feature",
}

interface IGeneratorOpts {
  cwd: string;
  args: yParser.Arguments;
}

const questions: prompts.PromptObject[] = [
  {
    name: "packageName",
    type: "text",
    message: "请输入 npm 包名（例如：doctor-xxx）",
    initial: "",
  },
  {
    name: "description",
    type: "text",
    message: "请输入项目描述",
  },
];

export default async ({ cwd, args }: IGeneratorOpts) => {
  let [name] = args._;
  let template = ETemplate.preset;

  const { username, email } = await getGitInfo();
  const author = email && username ? `${username} <${email}>` : "";

  template = (
    await promptsWithCancel({
      name: "template",
      type: "select",
      message: "你是想新开发一整套预设？还是想在已有的预设上开发新 feature",
      choices: [
        { title: "preset", value: "preset" },
        {
          title: "feature",
          value: "feature",
        },
      ],
    })
  ).template as ETemplate;

  const commandAnswer = await promptsWithCancel({
    name: "command",
    type: "text",
    message:
      template === ETemplate.preset
        ? "请输入 doctor 命令（例如：web-tools）"
        : "请输入预设名称（例如：web-tools）",
  });
  const command = commandAnswer.command;
  questions.forEach((item) => {
    if (item.name === "packageName") {
      item.initial = "doctor-" + template + "-" + command;
    }
  });
  const commandCamelCased = isKebabCase(command)
    ? kebabToCamelCase(command)
    : "";

  const data =
    template === ETemplate.preset
      ? {
          command,
          commandCamelCased,
          commandFile: command ? command : "command",
        }
      : { command, commandCamelCased };

  const target = name ? join(cwd, name) : cwd;
  const path =
    template === ETemplate.preset
      ? join(__dirname, "../templates/preset/")
      : join(__dirname, "../templates/feature/");

  const generator = new BaseGenerator({
    path,
    target,
    data: {
      author,
      ...data,
    },
    questions,
  });

  await generator.run();

  if (template === ETemplate.preset && command) {
    await rename(
      join(target, "./src/commands/command.ts"),
      join(target, `./src/commands/${command}.ts`)
    );
  }
};
