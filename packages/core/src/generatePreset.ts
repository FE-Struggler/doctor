import { ApplyPluginsType } from "@umijs/core/dist/types";
import { applyConfigFromSchema } from "./config";
import { DoctorLevel, IApi, RuleResItem } from "./types";
import { applyTypeEffect } from "./utils";
import { logger } from "@umijs/utils";
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
      const webToolsRes = (
        await api.applyPlugins({
          key: `addDoctor${transformString(command)}Check`,
          type: ApplyPluginsType.add,
          args: meta,
        })
      ).filter(Boolean);

      sort(webToolsRes.filter(Boolean)).forEach((i, index) => {
        switch (i?.doctorLevel) {
          case DoctorLevel.SUCCESS:
            console.log(
              `${chalk.green("pass🎉🎉")}  Doctor rules ${index}: ${
                i.label
              }\n${chalk.green("Suggestion:")}  ${i.description} \n`
            );
            break;
          case DoctorLevel.WARN:
            console.log(
              `${chalk.yellowBright("warn")}  Doctor rules ${index}: ${
                i.label
              }\n${chalk.yellowBright("Suggestion:")}  ${i.description} \n`
            );
            break;
          case DoctorLevel.ERROR:
            console.log(
              `${chalk.red("error!!")}  Doctor rules ${index}: ${
                i.label
              }\n${chalk.red("Suggestion:")}  ${i.description} \n`
            );
            break;
          default:
            break;
        }
      });

      //----------------- check end ------------------
      if (webToolsRes.some((i) => i.doctorLevel === DoctorLevel.ERROR)) {
        process.exit(1);
      }

      await api.applyPlugins({
        key: `addDoctor${transformString(command)}CheckEnd`,
        type: ApplyPluginsType.add,
      });
    },
  });
}
