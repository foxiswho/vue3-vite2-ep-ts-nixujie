<template>
  <div class="lzb-wrapper2">
    <el-container :class="classObj" class="lzb-wrapper">
      <el-aside :class="classObjAside" style="background-color: rgb(238, 241, 246);width:unset">
        <sidebar class="sidebar-container" />
      </el-aside>

      <el-container>
        <el-header style="height:unset">
          <div :class="{'fixed-header':fixedHeader}">
            <navbar />
          </div>
          <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        </el-header>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts'>
import {computed, defineComponent, onMounted,reactive,toRefs} from 'vue'
// import RightPanel from '@/components/RightPanel'
import {AppMain, Navbar} from '@/layout/components'
import { store } from '@/store/index'
import Sidebar from './components/Sidebar/Index.vue';
// import ResizeMixin from '@/layout/mixin/ResizeHandler'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // RightPanel,
    // Settings,
    Sidebar,
    // TagsView
  },
  setup() {
    //console.log('opened',store.getters.sidebar.opened)
    const sidebar = computed(() => store.getters.sidebar)
    const device = computed(() => store.getters.device)
    const showSettings = computed(() => store.getters.showSettings)
    const needTagsView = computed(() => store.getters.needTagsView)
    const fixedHeader = computed(() => store.getters.fixedHeader)
    const classObj = computed( () =>{
      return {
        hideSidebar: !store.getters.sidebar.opened,
        openSidebar: store.getters.sidebar.opened,
        withoutAnimation: store.getters.sidebar.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })

    const classObjAside = computed(()=>{
      return {
        hideSidebar: !store.getters.sidebar.opened,
        openSidebar: store.getters.sidebar.opened,
        mobile: device.value === 'mobile'
      }
    })
    function handleClickOutside() {
      store.dispatch('layout/closeSideBar', { withoutAnimation: false })
    }
    return {
      sidebar,
      device,
      showSettings,
      needTagsView,
      fixedHeader,
      classObj,
      classObjAside,
      handleClickOutside
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.lzb-wrapper {
  @include clearfix;
  min-width: 1200px;
  //display: flex;
  //flex: auto;
  //flex-direction: column;
  /*position: relative;*/
  height: 100%;
  /*width: 100%;*/
  &.mobile.openSidebar{
    //position: fixed;
    //top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
.lzb-wrapper2 {
  height: 100%;
}
.lzb-wrapper .el-header {
  padding: 0px;
  border-left: 1px solid #eee
}
.lzb-wrapper .el-main {
  padding: 10px;
}
.lzb-wrapper .el-aside{

  &.mobile.hideSidebar{
    width: 0px;
  }
}
</style>
