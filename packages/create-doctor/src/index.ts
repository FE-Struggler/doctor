import { prompts, BaseGenerator, yParser, getGitInfo } from "@umijs/utils";
import { join } from "path";
import { rename } from "fs/promises";
import { existsSync } from "fs";
import { factory } from "typescript";
import {
  isKebabCase,
  kebabToCamelCase,
  generateCode,
  parseFile,
  promptsWithCancel,
} from "./utils";

enum ETemplate {
  preset = "preset",
  feature = "feature",
}

interface IGeneratorOpts {
  cwd: string;
  args: yParser.Arguments;
}

const presetQuestions: prompts.PromptObject[] = [
  {
    name: "packageName",
    type: "text",
    message: "请输入 npm 包名（例如：doctor-xxx）",
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
  let target = "";
  let path = "";
  let command = "";
  let commandCamelCased = "";
  let check = "";

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

  if (template === ETemplate.preset) {
    const commandAnswer = await promptsWithCancel({
      name: "command",
      type: "text",
      message: "请输入 doctor 命令（例如：web-tools）",
    });
    command = commandAnswer.command;
    commandCamelCased = isKebabCase(command) ? kebabToCamelCase(command) : "";
  } else {
    const ckeckAnswer = await promptsWithCancel({
      name: "check",
      type: "text",
      message: "请输入 check 名称（例如：DefaultBrowser，使用大驼峰命名）",
    });
    check = ckeckAnswer.check;
  }

  if (template === ETemplate.preset) {
    target = name ? join(cwd, name) : cwd;
    path = join(__dirname, "../templates/preset/");
  } else {
    target = join(cwd, "./src/features");
    path = join(__dirname, "../templates/feature/");
  }

  const data =
    template === ETemplate.preset
      ? {
          command,
          commandCamelCased,
          commandFile: command ? command : "command",
        }
      : {};

  const generator = new BaseGenerator({
    path,
    target,
    data: {
      author,
      ...data,
    },
    questions: template === ETemplate.preset ? presetQuestions : [],
  });

  await generator.run();

  if (template === ETemplate.preset && command) {
    await rename(
      join(target, "./src/commands/command.ts"),
      join(target, `./src/commands/${command}.ts`)
    );
  }

  if (template === ETemplate.feature && check) {
    await rename(
      join(target, "./check.ts"),
      join(target, `./check${check}.ts`)
    );
  }

  if (template === ETemplate.feature) {
    const indexFilePath = join(target, "./index.ts");
    if (existsSync(indexFilePath)) {
      const sourceFile = await parseFile("index.ts", indexFilePath);
      (sourceFile.statements[0] as any).expression.elements.push(
        factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("require"),
            factory.createIdentifier("resolve")
          ),
          undefined,
          [factory.createStringLiteral(`./check${check ? check : ""}.ts`)]
        )
      );
      generateCode(sourceFile, indexFilePath);
    }
  }
};
