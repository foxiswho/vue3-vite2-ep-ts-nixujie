<template>
  <div class="menu">
    <!-- 一级菜单 -->
    <div class="menu-l">
      <div class="menu-l_icon lzb-menu-logo">
        <img v-if="logo" :src="logo">
      </div>
      <template v-for="(item, index) in menus" :key="index">
        <div
          v-if="item.hidden!==false"
          class="menu-l_icon"
          :class="index == menuIndex ? 'active' : ''"
          :title="item.name"
          :path="item.path"
          @click="handleIconMenu(item,index)"
        >
          <!-- Tooltip 文字提示 -->
          <el-tooltip placement="right">
            <div slot="content">
              {{ item.name }}
            </div>
          </el-tooltip>
          <div style="font-size: 13px;">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
    <!-- 二级菜单 -->
    <div class="menu-r rel" :class="{ collapsed: isCollapse }">
      <div class="lzb-logo-border">
        <!--      <logo v-if="showLogo" :collapse="isCollapse" />-->
        <router-link key="collapse" class="sidebar-logo-link" to="/">
          {{ title }}
        </router-link>
      </div>
      <div class="lzb-title">
        <el-divider content-position="center">{{ menuActive.name }}</el-divider>
      </div>
      <div class="menu2-wrap">
        <!-- 二级菜单菜单列表 -->
        <div class="menu-r_list">
          <ul>
            <sidebar-item
              v-for="(sec, index) in childMenus"
              :key="sec.path"
              :item="sec"
              :base-path="menuActive.path"
              :active="index == childIndex ? 'active' : ''"
              :active2index="threeChildIndex"
            />
          </ul>
        </div>
        <div class="menu2-footer"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, reactive, ref, toRefs, watch} from "vue";
import {mapGetters, useStore} from 'vuex'
import {useRouter, useRoute} from "vue-router";
import SidebarItem from '@/layout/components/Sidebar3/SidebarItem.vue'
import getPageTitle from '@/utils/get-page-title'
import logoImg from '@/assets/logo.png'
// import pathToRegexp from 'path-to-regexp'
export default {
  name: 'Index',
  components: {SidebarItem},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();


    // console.log('11111',router)
    // console.log('11111',router.options)
    // console.log('22222',route)
    // console.log('33333',store.getters.routes)
    // console.log('33333',store.getters.getRoutes())

    let routeUrlData = {}
    let routes = computed(() => {
      // return router.options.routes.filter(v => {
      //   return v.hidden == null || v.hidden == undefined || v.hidden === false
      // })
      if(store.getters.routes && store.getters.routes.length>0) {
        return store.getters.routes.filter(v => {
          return v.hidden == null || v.hidden == undefined || v.hidden === false
        })
      }
      return []
    })
    let isError = ref(false)
    let menus = ref([])
    let childMenus = ref([])
    let menuActive = ref({})
    let menuIndex = ref(0)
    let childIndex = ref(0)
    let threeChildIndex = ref(0)
    var stateToRefs = reactive({
      // 二级
      twoChildMenus: [],
      // 三级
      title: getPageTitle(),
      logo: logoImg,
      sidebar: computed(() => mapGetters(['sidebar'])),
      activeMenu: computed(() => {
        const {meta, path} = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      }),
      showLogo: true,
      isCollapse: computed(() => !store.getters.sidebar.opened),
    })

    function menusProcess() {
      menus.value.forEach((v, vIndex) => {
        if (v.children && v.children !== undefined) {
          v.children2 = {}
          // var TMP = v.children
          let url2 = v.path
          // v.children = TMP.filter(v => {
          //   return v.hidden !== true
          // })
          v.children.forEach((k, kIndex) => {
            k.pathAll = ''
            let path = k.path
            if (path !== undefined && path.indexOf('/') === 0) {
              url2 = k.path
            } else {
              if (v.path === '/') {
                url2 = v.path + k.path
              } else {
                if (k.path === '') {
                  url2 = v.path
                } else {
                  url2 = v.path + '/' + k.path
                }
              }
            }
            k.pathAll = url2
            var obj = {
              menuIndex: vIndex,
              childIndex: kIndex,
              threeChildIndex: -1
            }
            if (routeUrlData[k.pathAll]) {
              return
            }
            routeUrlData[k.pathAll] = obj
            if (k.children && k.children !== undefined) {
              var url3 = v.path
              k.children.forEach((t, tIndex) => {
                t.pathAll = ''
                var path3 = t.path
                if (path3 !== undefined && path3.indexOf('/') === 0) {
                  url3 = t.path
                } else {
                  if (k.path === '') {
                    url3 = k.pathAll
                  } else {
                    url3 = k.pathAll + '/' + t.path
                  }
                }
                t.pathAll = url3
                var obj = {
                  menuIndex: vIndex,
                  childIndex: kIndex,
                  threeChildIndex: tIndex
                }
                routeUrlData[t.pathAll] = obj
              })
            }
          })
        }
        return v
      })
    }

    function handleFilter2(value: string) {
      // 子集菜单
      let result3 = {}
      let find = routeUrlData[value]
      if (find) {
        if (find.menuIndex >= 0) {
          result3.menuIndex = find.menuIndex
          result3.childMenus = menus.value[find.menuIndex] ? menus.value[find.menuIndex] : []
          if (find.childIndex >= 0) {
            result3.childIndex = find.childIndex
            result3.twoChildMenus = result3.childMenus.children[find.childIndex]
            if (find.threeChildIndex >= 0) {
              result3.childIndex = find.childIndex
              result3.threeChildIndex = find.threeChildIndex
            }
          }
          if (menus.value[find.menuIndex].meta !== undefined && menus.value[find.menuIndex].meta.icon && menus.value[find.menuIndex].meta.icon.indexOf('active') === -1) {
            //this.$set(menus.value[find.menuIndex].meta, 'iconActive', menus.value[find.menuIndex].meta.icon + '-active')
          }
        }
      }
      return result3
    }

    // 点击一级菜单
    function handleIconMenu(item: Object, index: number) { // 切换父菜单
      // 更改菜单
      menuActive.value = item
      childMenus.value = item.children ? item.children : []
      menuIndex.value = index
      if (childMenus.value&&childMenus.value.length>0) {
        childIndex.value = 0
        router.push({path:childMenus.value&&childMenus.value[0].pathAll})
      } else {
        console.log('子级菜单不存在')
      }
    }

    // 点击二级菜单
    function handleSiderMenu(item, index) {
      item && item.pathAll && router.push({path: item.pathAll})
    }

    function routeHandle(route2) {
      const path = (route2 && route2.path) || route.path
      // TEST
      if (!path) {
        $message('菜单path字段为空')
        return false
      }
      if (path !== '/error') {
        // console.log(path)
        isError.value = false
        // const obj = this.handleFilter(this.menus, path)
        let obj2 = handleFilter2(path)
        // console.log(33333, obj2)
        // console.log(33333, this.routeUrlData)
        // console.log(33333, this.pathCompile(path))
        // console.log(33333, this.$route)
        if (!obj2.menuIndex) {
          // console.log(11111, obj2)
          // console.log(2222, this.menus)
          // console.log(this.routeUrlData)
          // console.log(this.$route.meta)
          if (route.meta.activeMenu) {
            obj2 = handleFilter2(route.meta.activeMenu)
            if (!obj2.menuIndex) {
              // console.log(obj2)
              this.$message('菜单path字段为空')
              return false
            }
          }
        }
        // 当前选中的父级菜单
        menuActive.value = obj2.childMenus ? obj2.childMenus : {}
        childMenus.value = obj2.childMenus && obj2.childMenus.children ? obj2.childMenus.children : []
        menuIndex.value = obj2.menuIndex ? obj2.menuIndex : 0
        childIndex.value = obj2.childIndex ? obj2.childIndex : 0
        threeChildIndex.value = obj2.threeChildIndex ? obj2.threeChildIndex : 0
      } else {
        isError.value = true
      }
    }

    // console.log('111', routes)
    menus.value = routes.value
    // console.log('2222', menus)
    menusProcess()
    routeHandle()
    watch(route, routeHandle)
    return {
      ...toRefs(stateToRefs),
      routes,
      menus,
      childMenus,
      menuIndex,
      childIndex,
      threeChildIndex,
      menuActive,
      handleIconMenu,
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  /*background-color: #fff;*/
  display: flex;

  .menu-l {
    width: 58px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 0 rgba(29, 29, 39, 0.1);
    box-sizing: border-box;
    //background-color: #000000;
    background: linear-gradient(
        90deg, #282c34, #000);
    z-index: 9;

    .menu-l_icon {
      width: 58px;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        background-color: #E8EFFF;
      }

      &.active {
        background: #1890ff;
        color: #fff;
      }

      i.icon {
        font-size: 24px;
      }

      /* .icon{
        width: 28px;
        height: 24px;
      } */
    }

    .lzb-menu-logo img {
      width: 38px;
    }
  }

  .menu-r {
    width: 162px;
    height: 100%;
    font-size: 14px;
    background-color: #ffffff;

    .menu-r_icon {
      position: relative;
      height: 80px;
      color: #fff;
      line-height: 80px;
      padding: 0 32px;
      box-sizing: border-box;

      span {
        position: absolute;
        top: 0;
        left: 32px;
        z-index: 9;
        font-size: 16px;
      }

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .lzb-title {
      .el-divider__text {
        padding: 0 8px;
      }
    }
    .el-divider__text {
      padding: 0 8px;
    }

    .menu2-wrap {
      height: 100%;
      overflow-x: hidden;

      .menu-r_list {
        width: 100%;
        color: #969696;
        //padding-left: 28px;
        box-sizing: border-box;
      }

      .menu2-footer {
        height: 100px;
      }
    }
  }

  .collapsed {
    transform: translateX(-150px);
    opacity: 0;
    display: none;
  }
}

.lzb-wrapper {
  .lzb-logo-border {
    border-bottom: 1px solid #eee;
    width: 154px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    font-size: 20px;
  }

  .lzb-title {
    display: -webkit-inline-box;
    height: 49px;
    width: 100%;
  }
}

</style>
<style>
.lzb-wrapper .menu-r .el-divider__text {
  padding: 0 8px;
}
</style>
