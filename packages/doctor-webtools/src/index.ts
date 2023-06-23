import features from "./features";
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
