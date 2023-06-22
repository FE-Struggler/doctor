import { IApi } from 'umi';
import { DEV_COMMAND } from '../constants';
import { logger } from '@umijs/utils';

export default (api: IApi) => {
  api.registerCommand({
    name: DEV_COMMAND,
    description: 'start incremental build in watch mode',
    async fn() {
      logger.info('dev')
    },
  });
};
