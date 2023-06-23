import { IApi } from 'umi';

export default (api: IApi) => {
  [
    'addDoctorWebToolsCheck',
  ].forEach((name) => {
    api.registerMethod({ name });
  });
};
