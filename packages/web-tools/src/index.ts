import features from "./features";
export * from "./type";
import defineConfig from "./defineConfig";

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

export { defineConfig };
