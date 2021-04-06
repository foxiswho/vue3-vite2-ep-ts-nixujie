import {loadEnv} from 'vite'
import {IEnv} from '@/type/store/interface'

/**
 *
 * @param mode 环境后缀 空| development | production
 * @returns {{appBaseUrl: (function(): string|string), portString: (function(): string|string), appBaseApi: (function(): string|string), port: (function(): number), env: (function(): {APP_BASE_API, APP_BASE_URL, PORT_STRING})}}
 */
export default (mode?: string) => {
  // console.log('mode',mode)
  if (!mode) {
    mode = ''
  }
  // console.log(process.argv)
  //获取本地环境文件
  let get = loadEnv(mode, process.cwd())
  let env: IEnv = {
    PORT: 3005,
    PORT_STRING: get.VITE_PORT || '3005',
    APP_BASE_API: get.VITE_APP_BASE_API || '',
    APP_BASE_URL: get.VITE_APP_BASE_URL || '',
  }
  env.PORT = parseInt(env.PORT_STRING)
  return {
    env: () => env,
    portString: () => env.PORT_STRING,
    port: () => env.PORT,
    appBaseApi: () => env.APP_BASE_API,
    appBaseUrl: () => env.APP_BASE_URL,
  }
}
