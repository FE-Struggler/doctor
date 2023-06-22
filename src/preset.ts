import { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => { });
  return {
    plugins: [
      require.resolve('./registerMethods'),

      // commands
      require.resolve('./commands/dev'),

      // features
    ],
  };
};
