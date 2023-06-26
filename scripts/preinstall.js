const childProcess = require("child_process");

let version;
try {
  version = childProcess.execSync("pnpm -v").toString();
} catch (err) {
  console.error(`Error: can't find module 'pnpm'.`);
  process.exit(1);
}

const majorVersion = version?.split(".")?.[0];
if (!majorVersion || +majorVersion < 8) {
  console.error(
    `Error: required pnpm version is not less than 8.0.0, but got ${version}.`
  );
  process.exit(1);
}
