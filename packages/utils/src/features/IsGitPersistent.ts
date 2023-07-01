import { execCommand } from "../exec";

/**
 * 如果此处有 error :没有正确配置上 ssh ,导致每次 git 操作都需要输入密码
 */
export default async function IsGitPersistent() {
  try {
    await execCommand("ssh-add -L");
    return true;
  } catch (error) {
    return false;
  }
}
