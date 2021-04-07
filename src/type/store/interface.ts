export interface ILayout {
  // 侧边栏 打开
  sidebar: {
    // 打开 关闭
    opened: boolean,
    // 无动画
    withoutAnimation: boolean
  },
  // 日志
  logs: Array<Object>,
  routes: Array<IMenubarList>,
  addRoutes: Array<IMenubarList>,
  errorLog: string,
  visitedViews: Array<IMenubarList>,
  cachedViews: Array<string>,
  token: string,
  userInfo: IUserInfo,
  roles: Array<string>,
  settings: ISetting
}

export interface IMenubarList {
  name?: string
  path: string
  redirect?: string | { name: string }
  hidden?: boolean // 是否隐藏路由
  alias?: Array<string> // 别名
  meta: {
    icon: string
    title: string
    permission?: Array<string>
    roles?: Array<string>
    affix?: boolean // 路由设置了该属性，
    activeMenu?: string // 路由设置了该属性，则会高亮相对应的侧边栏
    noCache?: boolean // 页面是否不缓存
    hidden?: boolean // 是否隐藏路由
    alwaysShow?: boolean // 当子路由只有一个的时候是否显示当前路由
  }
  component?: (() => Promise<typeof import('*.vue')>) | string
  children?: Array<IMenubarList>
}

export interface ITagsList {
  name: string
  title: string
  path: string
  isActive: boolean
}

export interface IToken {
  ACCESS_TOKEN: string,
  ACCESS_USER: IUserInfo,
}

export interface ISetting {
  theme: string
  showTags: boolean,
  showSettings: boolean,
  tagsView: boolean,
  fixedHeader: boolean,
  sidebarLogo: boolean,
  // 设备 desktop mobile
  device: string,
  // 大小 medium
  size: number | string,
}

// 用户
export interface IUserInfo {
  id: number,
  name: string,
  username: string,
  avatar: string,
  introduction: string,
  roles: Array<string>,
}

// 环境变量
export interface IEnv {
  PORT: number,
  PORT_STRING: string,
  APP_BASE_API: string,
  APP_BASE_URL: string,
  MODE: string,
}
