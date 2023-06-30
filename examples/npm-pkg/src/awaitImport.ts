// 不报错
async function test() {
  const res = await import("lodash-es");
  console.log(res);
}
