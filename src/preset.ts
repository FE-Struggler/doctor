import { IApi } from 'umi';
import webTools from './features/web-tools';

export default (api: IApi) => {
  api.onStart(() => { });
  return {
    plugins: [
      require.resolve('./registerMethods'),

      // commands
      require.resolve('./commands/web-tools'),

      // config
      require.resolve('./config'),

      // features
      ...webTools
    ],
  };
};
