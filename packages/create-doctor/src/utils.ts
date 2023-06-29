import { prompts } from "@umijs/utils";

export function isKebabCase(str: string) {
  return /^[a-z]+(-[a-z]+)*$/.test(str);
}

export function kebabToCamelCase(kebabCase: string) {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
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
