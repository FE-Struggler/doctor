const childProcess = require("child_process");

const versionReg = /pnpm@(.*)/;
const pnpmInfo = childProcess.execSync("npm ls pnpm -g").toString();
const version = pnpmInfo.match(versionReg)?.[1];
const majorVersion = version?.split(".")?.[0];

if (!majorVersion || +majorVersion < 8) {
  console.error(
    `Error: required pnpm version is not less than 8.0.0, but got ${version}`
  );
  process.exit(1);
}
