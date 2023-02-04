import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // token失效被动退出
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('请重新登录'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data
    console.log('response.data: ', response.data)
    // 要根据success的成功与否决定下面的操作
    if (code === 0) {
      return data
    } else {
      // 业务错误
      ElMessage.error(msg) // 提示错误消息
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    // TODO: 将来处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.msg) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
