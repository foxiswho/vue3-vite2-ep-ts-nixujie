// import store from '@/store'
// import {handleError} from 'vue'
import defaultSettings from '@/settings'
import { isString, isArray } from '@/utils/validate'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const needErrorLog: string|Array<string> = defaultSettings.errorLog

function checkNeed() {
    // @ts-ignore
    const env:string = process.env.NODE_ENV
    if (isString(needErrorLog)) {
        return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
        return needErrorLog.includes(env)
    }
    return false
}

// if (checkNeed()) {
//     Vue.config.errorHandler = function(err, vm, info, a) {
//         // Don't ask me why I use Vue.nextTick, it just a hack.
//         // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
//         Vue.nextTick(() => {
//             store.dispatch('errorLog/addErrorLog', {
//                 err,
//                 vm,
//                 info,
//                 url: window.location.href
//             })
//             console.error(err, info)
//         })
//     }
//
// }
