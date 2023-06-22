import { IApi } from 'umi';

export default (api: IApi) => {
  [
    'addDoctorStart',
  ].forEach((name) => {
    api.registerMethod({ name });
  });
};
