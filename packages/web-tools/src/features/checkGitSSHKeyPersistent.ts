import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { IsGitPersistent } from "@doctors/utils";

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const isGitPersist = await IsGitPersistent();

    // 配置默认规则
    const ruleLevel = api.userConfig.webTools.gitSshKey || DoctorLevel.WARN;

    if (isGitPersist) {
      return {
        label: "isGitSshKeyPersistent",
        description: `Git ssh has been persistent config`,
        doctorLevel: DoctorLevel.SUCCESS,
      };
    } else {
      return {
        label: "isGitSshKeyPersistent",
        description: `Git ssh has not been persistent configured yet. Please open your terminal and enter ssh-add`,
        doctorLevel: ruleLevel,
      };
    }
  });
};
