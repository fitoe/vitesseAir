import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

const baseURL = import.meta.env.VITE_BASE_HOST
const handleRefreshToken = () => post('/auth/refresh-token', { refreshToken: user.info?.refreshToken }, { meta: { authRole: 'refreshToken' } })
const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: (method) => {
    method.config.headers.Authorization = `Bearer ${user.info?.token || ''}`
  },
  refreshToken: {
    // 在请求前触发，将接收到method参数，并返回boolean表示token是否过期
    isExpired: (method) => {
      const token = user.info?.token || ''
      if (!token)
        return false
      const { exp } = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return exp < currentTime
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async (method) => {
      try {
        const refreshResponse = await handleRefreshToken()
        user.info = refreshResponse.data
      }
      catch (error) {
        // token刷新失败，跳转回登录页
        // location.href = '/login'
        // 并抛出错误
        // throw error
        console.log(error)
      }
    },
  },
})

const instance = createAlova({
  statesHook: VueHook,
  baseURL,
  requestAdapter: adapterFetch(),
  timeout: 8000,
  cacheFor: {
    GET: 0, // 60 * 10 * 1000
  },
  beforeRequest: onAuthRequired((method) => {
    // ...原请求前拦截器
  }),

  responded: {
    onSuccess: async (response, method) => {
      const json = await response.json()
      switch (response.status) {
        case 401:
          // $message.error(json.message)
          // 跳转到登录页面
          window.location.href = '#/login'
          break
        default:
          // $message.error(json.message)
          break
      }
      if (response.status !== 200) {
        $message.error(json.message)
        return Promise.reject(new Error(json.message))
      }
      return json
    },
    onError: (error, method) => {
      console.log(error, method)
      return Promise.reject(new Error('请求失败'))
    },
  },
})

// 优化：使用泛型和默认参数
export const get = <T>(url: string, params?: object, config: object = { baseURL }) => instance.Get<T>(url, { params, ...config })

export const post = <T>(url: string, data?: object, config: object = { baseURL }) => instance.Post<T>(url, data, config)

export const del = <T>(url: string, data?: object, config: object = { baseURL }) => instance.Delete<T>(url, data, config)

export const put = <T>(url: string, data?: object, config: object = { baseURL }) => instance.Put<T>(url, data, config)

export const upload = <T>(url: string, data: { name: string, filePath: string, formData: object }, config: object = {}) => instance.Post<T>(url, data, { requestType: 'upload', fileType: 'image', ...config })
