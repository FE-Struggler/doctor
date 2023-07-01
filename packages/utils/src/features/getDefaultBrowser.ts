export default async function getDefaultBrowser() {
  const defaultBrowser = await import("default-browser");
  return (await defaultBrowser.default()).name;
}
