import 'default-passive-events';  //去除touchstart谷歌提示
import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import {store} from '@/store/index'
import {envs} from '@/utils/env'
// 本项目使用了mock(模拟服务器响应), 如使用自己接口时候,请注释掉下面
import '@/mock/index'
import '@/permission'
// import './index.css'
// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import 'nprogress/nprogress.css'
// import '@/assets/css/index.css'
// import '@/assets/css/common.less';
import '@/styles/index.scss' // global css
import '@/assets/css/reset.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
