import {IEnv} from '@/type/store/interface'
// import { defineConfig,loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'
// // @ts-ignore
// export default ({ mode }) => {
//   return defineConfig({
//     plugins: [vue()],
//     base:loadEnv(mode, process.cwd()).BASE_URL
//   })
// }
/**
 * 环境变量
 */
export function envs(): IEnv {
  let env: IEnv = {
    PORT: 3005,
    // @ts-ignore
    PORT_STRING: import.meta.env.VITE_PORT || '3005',
    // @ts-ignore
    APP_BASE_API: import.meta.env.VITE_APP_BASE_API || '',
    // @ts-ignore
    APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL || '',
  }
  env.PORT = parseInt(env.PORT_STRING)
  return env
}
