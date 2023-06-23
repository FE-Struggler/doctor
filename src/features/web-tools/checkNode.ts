import { IApi } from "src/types";
import { logger } from '@umijs/utils'

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools.nodeVersion
    if (nodeVersion > 12) {
      return [
        {
          label: 'label',
          description: 'description',
          doctorLevel: ruleLevel
        }
      ]
    }
  })


  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools.nodeVersion
    if (ruleLevel === 'off') return;

    if (nodeVersion < 30) {
      return [
        {
          label: 'label2',
          description: 'description2',
          doctorLevel: 'error'
        }
      ]
    }


  })


  api.addDoctorWebToolsCheck(() => {
    const nodeVersion = parseInt(process.version.slice(1));
    const ruleLevel = api.userConfig.tools.nodeVersion
    if (nodeVersion > 12) {
      return [
        {
          label: 'Node Version',
          description: "Node Version can't bigger than 12.x",
          doctorLevel: ruleLevel
        }
      ]
    }
  })
}
