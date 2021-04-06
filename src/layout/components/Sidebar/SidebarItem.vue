<template>
  <template v-if="item.children&&item.children.length>0">
    <li
      v-if="!item.hidden"
      class="list_item"
      :class="item.children&&item.children.length>0 ? 'list_item_none_padding_left' : ('list_item_action ' + active )"
      :title="item.name"
    >
      <div class="title">
        {{ item.name }}
      </div>
    </li>
    <template v-for="(sec, index) in item.children" :key="index">
      <li
        v-if="!sec.hidden"
        class="list_item"
        :class="('list_item_action ' + (activeMenu==resolvePath2(sec.path?sec.path:'')?'active':'') )"
        :title="sec.name"
      >
        <div>
          <router-link :to="resolvePath2(sec.path?sec.path:'')">
            <span>{{ sec.name }}</span>
          </router-link>
        </div>
      </li>
    </template>
  </template>
  <template v-else>
    <li
      v-if="!item.hidden"
      class="list_item"
      :class="item.children&&item.children.length>0 ? 'list_item_none_padding_left' : ('list_item_action ' + (activeMenu==resolvePath2(item.path?item.path:'')?'active':'') )"
      :title="item.name"
      :title2="activeMenu"
      :title3="resolvePath2(item.path?item.path:'')"
    >
      <div>
        <router-link :to="resolvePath2(item.path?item.path:'')">
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </li>
  </template>
</template>
<script lang="ts">
import {resolvePath} from '@/utils/validate'
import {ref} from "vue";

export default {
  name: "SidebarItem",
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    active: {
      type: String,
      default: ''
    },
    activeMenu: {
      type: Object,
      default: ''
    },
    active2Index: {
      type: Number,
      default: -1
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // TODO: refactor with render function
    const onlyOneChild = ref({})

    function resolvePath2(routePath?: any) {
      // console.log(props.basePath,"=",routePath)
      let ph = resolvePath(props.basePath != null && props.basePath ? props.basePath : '', routePath != null && routePath ? routePath : '')
      console.log(props.basePath,"=",routePath,'=',ph)
      return ph
    }
   // console.log(props.activeMenu)
    return {
      onlyOneChild,
      resolvePath2
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-r_list {
  ul {
    li {
      .title {
        background-color: #f7f7fd;
        color: #2b2a2a;
        padding-left: 28px;
        line-height: 26px;
      }
    }
  }

  .list_item {
    //padding-top: 38px;
    //padding-bottom: 8px;
    padding-left: 28px;
    line-height: 22px;
    box-sizing: border-box;
    cursor: pointer;
    padding-top: 6px;
    color: #303133;
  }

  .list_item_none_padding_left {
    padding-left: 0;
    border-bottom: 1px solid #c7c1c1;
  }

  .list_item_action {
    &:hover {
      color: #276CFF;
    }

    &.active {
      color: #1890ff;
      //border-bottom: 1px solid #276cff;
      //background-color: lavender;
      background-color: rgba(24, 144, 255, .1) !important;
    }
  }
}
</style>
