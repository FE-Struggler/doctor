import features from "./features";

export * from "./type";

export default () => {
  return {
    plugins: [
      //commands
      require.resolve("./commands/web-tools"),
      //features
      ...features,
    ],
  };
};

export { default as defineConfig } from "./defineConfig";
