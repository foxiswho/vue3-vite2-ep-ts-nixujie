import {createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory} from 'vue-router'
import {IMenubarList} from '@/type/store/interface'

/* Layout */
const Layout = (() => import('@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>
const LayoutBlank = (() => import('@/layout/blank.vue')) as unknown as () => Promise<typeof import('*.vue')>
const LayoutRedirect = (() => import('@/layout/redirect.vue')) as unknown as () => Promise<typeof import('*.vue')>

// 静态路由页面
export const constantRoutes: Array<IMenubarList> = [
  {
    name: 'Redirect',
    path: '/redirect',
    component: Layout,
    meta: {title: '重定向页面', icon: 'el-icon-eleme'},
    hidden: true,
    children: [
      {
        name: 'Redirect',
        path: '/redirect/:pathMatch(.*)*',
        meta: {
          title: '重定向页面',
          icon: ''
        },
        component: LayoutRedirect
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: (() => import('@/views/login/login.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    meta: {title: '登录', icon: 'el-icon-eleme', hidden: true},
    hidden: true,
  },
  // {
  //   name: 'auth-redirect',
  //   path: '/auth-redirect',
  //   component: (() => import('@/views/login/auth-redirect.vue')) as unknown as () => Promise<typeof import('*.vue')>,
  //   meta: {title: 'auth-redirect', icon: 'el-icon-eleme', hidden: true},
  //   hidden: true,
  // },
  {
    name: 'ErrorPage',
    path: '/ErrorPage',
    meta: {title: '错误页面', hidden: true, icon: 'el-icon-eleme'},
    component: LayoutBlank,
    hidden: true,
    redirect: '/ErrorPage/404',
    children: [
      {
        name: '404',
        path: '/ErrorPage/404',
        component: (() => import('@/views/errorPage/404.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '404', icon: 'el-icon-s-tools'}
      },
      {
        name: '401',
        path: '/ErrorPage/401',
        component: (() => import('@/views/errorPage/404.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '401', icon: 'el-icon-s-tools'}
      }
    ]
  },
  // {
  //   name: 'Dashboard',
  //   path: '/',
  //   component: LayoutBlank,
  //   redirect: '/dashboard',
  //   hidden: true,
  //   meta: {title: '工作台', icon: 'el-icon-eleme'}
  // },
  {
    // name: 'Dashboard',
    path: '/home',
    alias: ['/'],
    component: LayoutBlank,
    redirect: '/dashboard/dashboard',
    hidden: true,
    meta: {title: '工作台', icon: 'el-icon-eleme'}
  },
  {
    name: '工作台',
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    meta: {title: '工作台', icon: 'el-icon-eleme'},
    children: [
      {
        name: '工作台',
        path: 'dashboard',
        component: (() => import('@/views/dashboard/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '工作台', icon: 'el-icon-s-tools'}
      },
      {
        name: '修改密码',
        path: 'operator/password',
        component: (() => import('@/views/dashboard/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '修改密码', icon: 'el-icon-s-tools'}
      },
    ]
  },
]

export const asyncRoutes: Array<IMenubarList> = [
  {
    name: 'Project',
    path: '/Project',
    component: Layout,
    redirect: '/Project/ProjectList',
    meta: {title: '项目管理', icon: 'el-icon-phone'},
    children: [
      {
        name: 'ProjectList',
        path: 'ProjectList',
        component: (() => import('@/views/Project/ProjectList.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '项目列表', icon: 'el-icon-goods'}
      },
      {
        name: 'ProjectDetail',
        path: 'ProjectDetail/:projName',
        hidden: true,
        component: (() => import('@/views/Project/ProjectDetail.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '项目详情', icon: 'el-icon-question', activeMenu: '/Project/ProjectList', hidden: true}
      },
      {
        name: 'ProjectImport',
        path: 'ProjectImport',
        component: (() => import('@/views/Project/ProjectImport.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '项目导入', icon: 'el-icon-help'}
      },
    ]
  },

  {
    name: 'Nav',
    path: '/Nav',
    component: Layout,
    redirect: '/Nav/SecondNav/ThirdNav',
    meta: {title: '多级导航', icon: 'el-icon-picture'},
    children: [
      {
        name: 'SecondNav',
        path: 'SecondNav',
        redirect: '/Nav/SecondNav/ThirdNav',
        component: (() => import('@/views/Nav/SecondNav/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '二级导航', icon: 'el-icon-camera', alwaysShow: true},
        children: [
          {
            name: 'ThirdNav',
            path: '/Nav/SecondNav/ThirdNav',
            component: (() => import('@/views/Nav/SecondNav/ThirdNav/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
            meta: {title: '三级导航', icon: 'el-icon-s-platform'}
          },
        ]
      },
      {
        name: 'SecondText',
        path: 'SecondText',
        redirect: '/Nav/SecondText/ThirdText',
        component: (() => import('@/views/Nav/SecondText/ThirdText/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '二级文本', icon: 'el-icon-s-opportunity', alwaysShow: true},
        children: [
          {
            name: 'ThirdText',
            path: '/Nav/SecondText/ThirdText',
            component: (() => import('@/views/Nav/SecondText/ThirdText/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
            meta: {title: '三级文本', icon: 'el-icon-menu'}
          },
        ]
      },
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    meta: {title: 'test管理', icon: 'el-icon-phone'},
    children: [
      {
        name: 'index',
        path: 'index',
        component: (() => import('@/views/test/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
        meta: {title: '指令test', icon: 'el-icon-goods'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    name: '*',
    path: '/:pathMatch(.*)*',
    redirect: '/ErrorPage/404',
    meta: {title: '404', icon: 'el-icon-404'},
    hidden: true
  }
]

const initCreateRouter = () => createRouter({
  history: createWebHashHistory(), // createWebHistory
  // history: createWebHistory(),
  routes: constantRoutes.concat(asyncRoutes) as RouteRecordRaw[]
})

export let router = initCreateRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  let newRouter = initCreateRouter()
  // router.matcher = newRouter.matcher // reset router
  router = newRouter
}

export default router
