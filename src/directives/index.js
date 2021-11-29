import print from 'vue3-print-nb'
import permission from './permission'

/**
 * 创建功能受控指令
 */
export default (app) => {
  app.use(print)
  app.directive('permission', permission)
}
