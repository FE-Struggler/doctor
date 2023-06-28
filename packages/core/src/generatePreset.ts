import { ApplyPluginsType } from "@umijs/core/dist/types";
import { applyConfigFromSchema } from "./config";
import { DoctorLevel, IApi, RuleResItem } from "./types";
import {
  applyTypeEffect,
  toUpperUnderscore,
  mergeObjectsByProp,
} from "./utils";
import { chalk } from "@umijs/utils";

function transformString(str: string) {
  const parts = str.split("-");
  const capitalizedParts = parts.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  return capitalizedParts.join("");
}

function sort(webToolsRes: RuleResItem[]) {
  return webToolsRes.sort((a, b) => {
    if (a.doctorLevel === b.doctorLevel) {
      return 0;
    } else if (a.doctorLevel === DoctorLevel.SUCCESS) {
      return -1;
    } else if (
      a.doctorLevel === DoctorLevel.WARN &&
      b.doctorLevel !== DoctorLevel.SUCCESS
    ) {
      return -1;
    } else if (
      a.doctorLevel === DoctorLevel.ERROR &&
      b.doctorLevel !== DoctorLevel.WARN &&
      b.doctorLevel !== DoctorLevel.SUCCESS
    ) {
      return -1;
    } else {
      return 1;
    }
  });
}

interface GeneratePresetProps {
  api: IApi;
  command: string;
  schema?: Object;
  meta?: Object;
}

export default function generatePreset({
  api,
  schema,
  command,
  meta,
}: GeneratePresetProps) {
  api.describe({
    key: `doctor-generate-preset-fn-${command}`,
  });
  applyTypeEffect(api, transformString(command));

  if (schema) {
    applyConfigFromSchema(api, schema);
  }

  api.registerCommand({
    name: command,
    description: "start incremental build in watch mode",
    async fn() {
      //----------------- check before ------------------
      await api.applyPlugins({
        key: `addDoctor${transformString(command)}CheckBefore`,
        type: ApplyPluginsType.add,
      });

      //----------------- checking ------------------
      const checkedResult = (
        await api.applyPlugins({
          key: `addDoctor${transformString(command)}Check`,
          type: ApplyPluginsType.add,
          args: meta,
        })
      ).filter(Boolean);
      const mergedRes = sort(mergeObjectsByProp(checkedResult.filter(Boolean)));
      mergedRes.forEach((rule, index) => {
        console.log(
          chalk.greenBright(
            `${chalk.greenBright(
              `${index++ < 10 ? "0" + index++ : index++}. ${toUpperUnderscore(
                rule.label
              )}`
            )}\n`
          )
        );
        rule.descriptions.forEach((i) => {
          switch (i?.level) {
            case DoctorLevel.SUCCESS:
              console.log(
                `${chalk.bgGreenBright(" DoctorLevel SUCCESS 🎉🎉 ")}`
              );
              console.log(`${chalk.greenBright(" WHY ")}${i.suggestion} \n`);
              break;
              break;
            case DoctorLevel.WARN:
              console.log(`${chalk.bgYellowBright("DoctorLevel WARN ")}`);
              console.log(
                `${chalk.greenBright(" SUGGESTION ")}${i.suggestion} \n`
              );
              break;
            case DoctorLevel.ERROR:
              console.log(`${chalk.bgRedBright(" DoctorLevel Error ")}`);
              console.log(
                `${chalk.greenBright(" SUGGESTION ")}${i.suggestion} \n`
              );
              break;
            default:
              break;
          }
        });
      });

      //----------------- check end ------------------
      if (mergedRes.some((i) => i.doctorLevel === DoctorLevel.ERROR)) {
        process.exit(1);
      }

      await api.applyPlugins({
        key: `addDoctor${transformString(command)}CheckEnd`,
        type: ApplyPluginsType.add,
      });
    },
  });
}
