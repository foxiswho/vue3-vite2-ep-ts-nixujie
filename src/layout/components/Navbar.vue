<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar"/>

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

    <div class="right-menu">
      <div class="username">
        {{ name }}
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/dashboard">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <router-link to="/user/operator/password">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import {mapGetters, useStore} from 'vuex'
import {defineComponent, computed, toRefs, reactive} from 'vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'
import {useRouter, useRoute} from "vue-router";
import headImg from '@/assets/default/head.gif'

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    //console.log(store.getters.name)
    //console.log(mapGetters(['name']))
    const toggleSideBar = async () => {
      store.dispatch('layout/toggleSideBar')
      //console.log('sidebar',store.getters.sidebar)
    }
    const logout = async () => {
      await store.dispatch('layout/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }
    const state = reactive({
      sidebar: store.getters.sidebar,
      avatar: store.getters.avatar ? store.getters.avatar : headImg,
      device: store.getters.device,
      name: store.getters.name,
    });
    return {
      ...toRefs(state),
      toggleSideBar,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 30px;
    &:focus {
      outline: none;
    }

    .username {
      float: left;
      text-align: right;
      padding-right: 10px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          //right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
