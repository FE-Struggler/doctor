import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import { execCommand } from "@doctors/utils";

// 如果此处有error:没有正确配置上ssh,导致每次git操作都需要输入密码
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

    if (isGitPersist) {
      return {
        label: "Git ssh Persist",
        description: `Git ssh has been persistent config`,
        doctorLevel: DoctorLevel.SUCCESS,
      };
    } else {
      return {
        label: "Git ssh Persist",
        description: `Git ssh has not been persistent configured yet.\n
        Please open your terminal and enter ssh-add`,
        doctorLevel: DoctorLevel.WARN,
      };
    }
  });
};
