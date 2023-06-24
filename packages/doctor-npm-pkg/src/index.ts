import features from "./features";
export default () => {
  return {
    plugins: [
      //commands
      require.resolve("./commands/npm-pkg"),
      //features
      ...features,
    ],
  };
};
