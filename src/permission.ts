import {router} from '@/router'
import {store} from '@/store/index'
import getPageTitle from '@/utils/get-page-title'
import {getLocalToken} from '@/utils/auth'
import {configure, start, done} from 'nprogress'
import {RouteRecordRaw} from 'vue-router'
import {ElNotification} from "element-plus";

configure({showSpinner: false})

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  start()
  let title = to.meta && to.meta.title ? to.meta.title : ''
  // @ts-ignore
  document.title = getPageTitle(title)
  const hasToken = getLocalToken()
  // console.log(hasToken)
  // console.log(to)
  if (hasToken && hasToken.ACCESS_TOKEN) {
    if ('/login' === to.path) {
      next({path: '/'})
      done()
    } else {
      // console.log(11111)
      // console.log(store.getters.userInfo)
      let hasRoles =  false
      // console.log('store.getters.roles=',store.getters.roles)
      // console.log('store.getters.roles=',store.getters.routes && store.getters.routes.length>0)
      // console.log('store.getters.routes=',store.getters.routes)
      // console.log('store.getters.routes=',store.getters.userInfo && store.getters.userInfo.roles && store.getters.userInfo.roles.length > 0)
      // console.log('store.getters.routes=',store.getters.userInfo )
      if(store.getters.routes && store.getters.routes.length>0 && store.getters.userInfo && store.getters.userInfo.roles && store.getters.userInfo.roles.length > 0){
        hasRoles =  true
      }
      // const hasRoles = false
      // console.log(hasRoles)
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const data = await store.dispatch('layout/getInfo')
          // console.log(data)
          const roles = data.data.info.roles
          // 判断是否添加过路由
          if(!store.getters.routes || 0 == store.getters.routes.length){
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('layout/generateRoutes', roles)
            // console.log('store.getters.roles=',store.getters.roles)
            // console.log('store.getters=',store.getters)
            // console.log(accessRoutes)
            // console.log(router.getRoutes())
            // dynamically add accessible routes
            if (accessRoutes && accessRoutes.length > 0) {
              accessRoutes.forEach((item: RouteRecordRaw) => {
                // console.log(item)
                router.addRoute(item)
              })
            }
            // console.log(router.getRoutes())
            // console.log(router)
          }

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({...to, replace: true})
        } catch (error) {
          console.log(error)
          // remove token and go to login page to re-login
          await store.dispatch('layout/resetToken')
          //Message.error(error || 'Has Error')
          ElNotification({
            message: error,
            type: 'error'
          })
          next(`/login?redirect=${to.path}`)
          done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      done()
    }
  }
})

router.afterEach(() => {
  done()
})
