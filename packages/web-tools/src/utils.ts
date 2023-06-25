import { chalk } from "@umijs/utils";
import { DoctorLevel } from "@doctors/core";

export function chalkByDoctorLevel(doctorLevel: DoctorLevel, chalkStr: string) {
  switch (doctorLevel) {
    case DoctorLevel.SUCCESS:
      return chalk.green(chalkStr);
    case DoctorLevel.WARN:
      return chalk.yellowBright(chalkStr);
    case DoctorLevel.ERROR:
      return chalk.red(chalkStr);
  }
}
