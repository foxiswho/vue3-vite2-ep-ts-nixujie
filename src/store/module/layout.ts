import {ILayout, IMenubarList, ITagsList, IToken, IUserInfo} from "@/type/store/interface";
import {ActionContext} from "vuex";
import {asyncRoutes, constantRoutes, resetRouter, router} from '@/router'
import {getLocalToken, setLocalToken, clearLocalToken} from '@/utils/auth'
import {login, logout, getInfo, loginParam, loginVo} from '@/api/user'
import {RouteRecordRaw} from "vue-router";
import defaultSettings from '@/settings'

////////////
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: IMenubarList) {
  if (route.meta && route.meta.roles) {
    // @ts-ignore
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: Array<IMenubarList>, roles: Array<string>) {
  const res: Array<IMenubarList> = []

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}


///////////
const sidebarStatus = localStorage.getItem('sidebarStatus')
const tokenData = getLocalToken()
const state: ILayout = {
  sidebar: {
    opened: sidebarStatus == null || false || sidebarStatus == '0' ? false : true,
    withoutAnimation: false
  },
  logs: [],
  routes: [],
  addRoutes: [],
  errorLog: 'production',
  visitedViews: [],
  cachedViews: [],
  token: tokenData.ACCESS_TOKEN ? tokenData.ACCESS_TOKEN : '',
  userInfo: (tokenData.ACCESS_USER && tokenData.ACCESS_USER.username) ? tokenData.ACCESS_USER : {
    id: 0,
    username: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
  },
  roles: [],
  settings: {
    theme: '#1890ff',
    showSettings: defaultSettings.showSettings,
    showTags: true,
    tagsView: defaultSettings.tagsView,
    fixedHeader: defaultSettings.fixedHeader,
    sidebarLogo: defaultSettings.sidebarLogo,
    device: 'desktop',
    size: localStorage.getItem('size') || 'medium',
  }
}

const mutations = {
  // 侧边栏 打开 关闭
  TOGGLE_SIDEBAR: (state: ILayout) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', '1')
    } else {
      localStorage.setItem('sidebarStatus', '0')
    }
  },
  // 侧边栏 关闭
  CLOSE_SIDEBAR: (state: ILayout, withoutAnimation: boolean) => {
    localStorage.setItem('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 侧边栏 打开
  OPEN_SIDEBAR: (state: ILayout, withoutAnimation: boolean) => {
    localStorage.setItem('sidebarStatus', '1')
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 侧边栏 设备
  TOGGLE_DEVICE: (state: ILayout, device: string) => {
    state.settings.device = device
  },
  // 大小
  SET_SIZE: (state: ILayout, size: string) => {
    state.settings.size = size
    localStorage.setItem('size', size)
  },
  // 添加日志
  ADD_ERROR_LOG: (state: ILayout, log: Object) => {
    state.logs.push(log)
  },
  // 清除日志
  CLEAR_ERROR_LOG: (state: ILayout) => {
    state.logs.splice(0)
  },
  // 设置路由
  SET_ROUTES: (state: ILayout, routes: Array<IMenubarList>) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  //改变配置
  CHANGE_SETTING: (state: ILayout, data: { key: string, value: object }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(data.key)) {
      // @ts-ignore
      state[data.key] = data.value
    }
  },
  ADD_VISITED_VIEW: (state: ILayout, view: IMenubarList) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state: ILayout, view: IMenubarList) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (state: ILayout, view: IMenubarList) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state: ILayout, view: IMenubarList) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (state: ILayout, view: IMenubarList) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state: ILayout, view: IMenubarList) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: (state: ILayout) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state: ILayout) => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state: ILayout, view: IMenubarList) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  SET_TOKEN: (state: ILayout, token: IToken) => {
    state.token = token.ACCESS_TOKEN
    state.userInfo = token.ACCESS_USER
  },
  SET_USERINFO: (state: ILayout, data: IUserInfo) => {
    state.userInfo = data
  },
  SET_INTRODUCTION: (state: ILayout, introduction: string) => {
    state.userInfo.introduction = introduction
  },
  SET_NAME: (state: ILayout, name: string) => {
    state.userInfo.name = name
  },
  SET_AVATAR: (state: ILayout, avatar: string) => {
    state.userInfo.avatar = avatar
  },
  SET_ROLES: (state: ILayout, roles: Array<string>) => {
    state.roles = roles
  }
}

const actions = {
  // 点击侧边栏
  async toggleSideBar(context: ActionContext<ILayout, IState>): Promise<void> {
    context.commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  async closeSideBar(context: ActionContext<ILayout, IState>, withoutAnimation: boolean): Promise<void> {
    context.commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 侧边栏设备
  async toggleDevice(context: ActionContext<ILayout, IState>, device: string): Promise<void> {
    context.commit('TOGGLE_DEVICE', device)
  },
  // 大小
  async setSize(context: ActionContext<ILayout, IState>, size: string): Promise<void> {
    context.commit('SET_SIZE', size)
  },
  // 添加日志
  async addErrorLog(context: ActionContext<ILayout, IState>, log: Object): Promise<void> {
    context.commit('ADD_ERROR_LOG', log)
  },
  // 清除日志
  async clearErrorLog(context: ActionContext<ILayout, IState>): Promise<void> {
    context.commit('CLEAR_ERROR_LOG')
  },
  // 路由
  async generateRoutes(context: ActionContext<ILayout, IState>, roles: Array<string>): Promise<Array<IMenubarList>> {
    return new Promise(resolve => {
      let accessedRoutes: Array<IMenubarList>
      if (roles && roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // console.log(accessedRoutes)
      context.commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  //改变配置
  async changeSetting(context: ActionContext<ILayout, IState>, data: object): Promise<void> {
    context.commit('CHANGE_SETTING', data)
  },
  addView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    context.dispatch('addVisitedView', view)
    context.dispatch('addCachedView', view)
  },
  addVisitedView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    context.commit('ADD_VISITED_VIEW', view)
  },
  addCachedView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    context.commit('ADD_CACHED_VIEW', view)
  },

  delView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.dispatch('delVisitedView', view)
      context.dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.dispatch('delOthersVisitedViews', view)
      context.dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    return new Promise(resolve => {
      context.dispatch('delAllVisitedViews', view)
      context.dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews(context: ActionContext<ILayout, IState>) {
    return new Promise(resolve => {
      context.commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews(context: ActionContext<ILayout, IState>) {
    return new Promise(resolve => {
      context.commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView(context: ActionContext<ILayout, IState>, view: IMenubarList) {
    context.commit('UPDATE_VISITED_VIEW', view)
  },

  // 用户登陆
  login(context: ActionContext<ILayout, IState>, userInfo: loginParam): Promise<any> {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const data = response.data
        // console.log(data)
        const info: IToken = {
          ACCESS_TOKEN: data.data.token,
          ACCESS_USER: data.data.info
        }
        context.commit('SET_TOKEN', info)
        context.commit('SET_ROLES', info.ACCESS_USER.roles)
        context.commit('OPEN_SIDEBAR', false)
        // context.commit('SET_NAME', info.ACCESS_USER.name)
        // context.commit('SET_AVATAR', info.ACCESS_USER.avatar)
        // context.commit('SET_INTRODUCTION', info.ACCESS_USER.introduction)
        setLocalToken(info)
        // @ts-ignore
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo(context: ActionContext<ILayout, IState>): Promise<any> {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response.data
        // console.log(data)
        if (!data || data.code != 200) {
          reject('Verification failed, please Login again.')
          return
        }
        let ret = data.data;
        let info = ret.info
        // roles must be a non-empty array
        if (!info.roles || info.roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        if (info) {
          const userData: IToken = {
            ACCESS_TOKEN: '',
            ACCESS_USER: data.data.info
          }
          context.commit('SET_USERINFO', userData.ACCESS_USER)
          context.commit('SET_ROLES', info.roles)
          // context.commit('SET_NAME', info.name)
          // context.commit('SET_AVATAR', info.avatar)
          // context.commit('SET_INTRODUCTION', info.introduction)
        }
        resolve(data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // user logout
  logout(context: ActionContext<ILayout, IState>): Promise<any> {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        context.commit('SET_TOKEN', {})
        // context.commit('SET_USERINFO', [])
        context.commit('SET_ROLES', [])
        clearLocalToken()
        resetRouter()

        // reset visited views and cached views
        context.dispatch('layout/delAllViews', null, {root: true})

        // @ts-ignore
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken(context: ActionContext<ILayout, IState>): Promise<any> {
    return new Promise(resolve => {
      context.commit('SET_TOKEN', {})
      context.commit('SET_ROLES', [])
      clearLocalToken()
      // @ts-ignore
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles(context: ActionContext<ILayout, IState>, role: string) {
    const token = role + '-token'

    context.commit('SET_ROLES', [token])
    // setLocalToken(token)

    const {data} = await context.dispatch('layout/getInfo')
    const roles = data.data.info.roles
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await context.dispatch('layout/generateRoutes', roles, {root: true})
    // dynamically add accessible routes
    if (accessRoutes && accessRoutes.length > 0) {
      accessRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    }


    // reset visited views and cached views
    context.dispatch('layout/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
