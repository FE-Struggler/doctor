import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { execCommand } from "@doctors/utils";

/** 如果此处有 error :没有正确配置上 ssh ,导致每次 git 操作都需要输入密码 */
export async function checkIsGitPersistent() {
  try {
    await execCommand("ssh-add -L");
    return true;
  } catch (error) {
    return false;
  }
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    const [isGitPersist] = await Promise.all([checkIsGitPersistent()]);

    // 配置默认规则
    const ruleLevel = (api.userConfig.tools?.gitSshKey ||
      DoctorLevel.WARN) as DoctorLevel;

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
