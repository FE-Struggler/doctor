import ts, { createSourceFile, ScriptTarget, createPrinter } from "typescript";
import { prompts } from "@umijs/utils";
import { readFile, writeFile } from "fs/promises";

export function isKebabCase(str: string) {
  return /^[a-z]+(-[a-z]+)*$/.test(str);
}

export function kebabToCamelCase(kebabCase: string) {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export async function parseFile(fileName: string, path: string) {
  const sourceCode = await readFile(path, { encoding: "utf-8" });
  const node = createSourceFile(
    fileName,
    sourceCode,
    ScriptTarget.Latest,
    true
  );
  return node;
}

export async function generateCode(ast: ts.Node, path: string) {
  const printer = createPrinter();
  const newCode = printer.printNode(
    ts.EmitHint.Unspecified,
    ast,
    ast.getSourceFile()
  );

  writeFile(path, newCode, {
    encoding: "utf-8",
    flag: "w",
  });
}

export function promptsWithCancel(
  questions: prompts.PromptObject | prompts.PromptObject[]
) {
  return prompts(questions, {
    onCancel() {
      process.exit(0);
    },
  });
}
