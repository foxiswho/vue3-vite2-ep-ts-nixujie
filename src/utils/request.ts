import {store} from '@/store/index'
import axios from 'axios'
import {AxiosResponse} from 'axios'
import {ElLoading, ElNotification} from 'element-plus'
import {getLocalToken} from '@/utils/auth'

let loading: { close(): void }
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // @ts-ignore
  // baseURL: process.env.VUE_APP_API_BASE_URL | undefined,
  baseURL: undefined,
  timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: { message: string }) => {
  loading.close()
  console.log(`err${error}`)
  ElNotification({
    title: '请求失败',
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)'
  })
  // const store = useStore()
  // console.log(store)
  let token = store.getters && store.getters.token && store.getters.token ? store.getters.token : ''
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = getLocalToken().ACCESS_TOKEN
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<IR>) => {
  loading.close()
  if (response.status !== 200) {
    //console.log(response.data)
    if (401 === response.status) {
      localStorage.clear()
      ElNotification({
        title: '身份认证失败',
        message: response.data.message,
        type: 'error'
      })
      return Promise.reject(new Error(response.data.message || 'Error'))
    }
  } else {
    return response
  }
  return response
}, (error: AxiosResponse<IR>) => {
  loading.close()
  if (400 === error.status) {
    ElNotification({
      message: error.data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return error
  } else if (401 === error.status) {
    localStorage.clear()
    ElNotification({
      title: '身份认证失败',
      message: error.data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(error.data.message || 'Error'))
  } else if (404 === error.status) {
    ElNotification({
      title: '路径不存在',
      message: '路径不存在',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error('路径不存在'))
  } else if (401 < error.status) {
    ElNotification({
      message: error.data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return error
  } else if (400 > error.status) {
    if (error.statusText == 'Network Error') {
      ElNotification({
        message: '网络异常！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      ElNotification({
        message: error.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
  return Promise.reject(error)
})

export default request
