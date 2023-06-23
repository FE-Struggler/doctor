import { DoctorLevel, IApi } from 'src/types';
import { logger } from '@umijs/utils';
import { ApplyPluginsType } from '@umijs/core/dist/types';

export interface ruleResItem{
  label: string,
  description: string,
  doctorLevel: DoctorLevel
}

function sort(webToolsRes: ruleResItem[]) {
  return webToolsRes.sort((a, b) => {
    if (a.doctorLevel === b.doctorLevel) {
      return 0;
    } else if (a.doctorLevel === 'warn') {
      return -1;
    } else if (b.doctorLevel === 'warn') {
      return 1;
    } else if (a.doctorLevel === 'error') {
      return -1;
    } else {
      return 1;
    }
  })
}

export default (api: IApi) => {
  api.registerCommand({
    name: 'web-tools',
    description: 'start incremental build in watch mode',
    async fn() {
      logger.info('web tools checking')
      const webToolsRes = await api.applyPlugins({
        key: 'addDoctorWebToolsCheck',
        type: ApplyPluginsType.add,
      }) as ruleResItem[]
      sort(webToolsRes).filter(Boolean).forEach(i => {
        switch (i.doctorLevel) {
          case 'warn':
            logger.warn(`Doctor rules: ${i.label} --  ${i.description} `)
            break;
          default:
            logger.error(`Doctor rules: ${i.label} --  ${i.description} `)
            break;
        }
      })

      if (webToolsRes.some(i => i.doctorLevel === 'error')) {
       process.exit(1);
      }
    },
  });
};
