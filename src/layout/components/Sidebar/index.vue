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
          :class="firstActiveMenus.path == item.path ? 'active' : ''"
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
        <router-link key="collapse" class="sidebar-logo-link" to="/dashboard">
          {{ title }}
        </router-link>
      </div>
      <div class="lzb-title">
        <el-divider content-position="center">{{ firstActiveMenus.name }}</el-divider>
      </div>
      <div class="menu2-wrap">
        <!-- 二级菜单菜单列表 -->
        <div class="menu-r_list">
          <ul>
            <sidebar-item
              v-for="(sec, index) in childMenus"
              :key="sec.path"
              :item="sec"
              :base-path="firstActiveMenus.path"
              :active="(currentActiveMenu.path ? currentActiveMenu.path : '') == resolvePath2(firstActiveMenus.path,sec.path) ? 'active' : ''"
              :activeMenu="currentActiveMenuPath?currentActiveMenuPath:''"
            />
          </ul>
        </div>
        <div class="menu2-footer"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {mapGetters, useStore} from "vuex";
import {computed, reactive, ref, toRefs, watch} from "vue";
import getPageTitle from "@/utils/get-page-title";
import logoImg from "@/assets/logo.png";
import {resolvePath} from '@/utils/validate'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
import {IMenubarList} from "@/type/store/interface";

export default {
  name: "index",
  components: {SidebarItem},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // console.log('route', route)
    let routes = computed(() => {
      if (store.getters.routes && store.getters.routes.length > 0) {
        return store.getters.routes.filter((v: any) => {
          return v.hidden == null || v.hidden == undefined || v.hidden === false
        })
      }
      return []
    })
    // let isError = ref(false)
    let menus = ref([])
    // 左侧一级栏目
    let firstActiveMenus = computed(()=>route.matched && route.matched.length > 0 && route.matched[0] ? route.matched[0] : [])
    // 一级栏目下子集
    let childMenus = computed(()=>route.matched && route.matched.length > 0 && route.matched[0].children ? route.matched[0].children : [])
    //当前动作路由菜单
    let currentActiveMenu = computed(() => route)
    //当前url路径
    let currentActiveMenuPath = computed(() => {
      if (route && route.meta && route.meta.activeMenu) {
        return route.meta.activeMenu
      }
      return route.path
    })
    var stateToRefs = reactive({
      title: getPageTitle(),
      logo: logoImg,
      sidebar: computed(() => mapGetters(['sidebar'])),
      showLogo: true,
      isCollapse: computed(() => !store.getters.sidebar.opened),
    })

    // 点击一级菜单
    function handleIconMenu(item: Object, index: number) {
      // console.log(item)
      // 更改菜单
      //childMenus.value = item.children ? item.children : []
      if (item.children && item.children.length > 0) {
        let path = resolvePath(item.path, item.children[0].path)
        // console.log(path)
        router.push({path: path})
        return
      } else {
        console.log('子级菜单不存在')
      }
    }

    function resolvePath2(basePath: string, routePath?: any) {
      let path = resolvePath(basePath ? basePath : '', routePath != null && routePath ? routePath : '')
      //console.log(path, '=', route.path)
      return path
    }
    //路由赋值
    menus.value = routes.value

    // console.log('firstActiveMenus', firstActiveMenus)
    // console.log('currentActiveMenu', currentActiveMenu)
    // console.log('childMenus', childMenus)
    // console.log('activeMenu', currentActiveMenuPath)
    // console.log('route.matched', route.matched)
    // watch(route, (route)=>{
    //   childMenus.value = route.children ? route.children : []
    // })
    return {
      ...toRefs(stateToRefs),
      routes,
      menus,
      childMenus,
      currentActiveMenu,
      currentActiveMenuPath,
      handleIconMenu,
      resolvePath2,
      firstActiveMenus,
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
