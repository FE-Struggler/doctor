import features from "./features";
export * from "./type";
import defineConfig from "./defineConfig";
export default () => {
  return {
    plugins: [
      //commands
      require.resolve("./commands/commands"),
      //features
      ...features,
    ],
  };
};

export { defineConfig };
