<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore, mapGetters } from 'vuex';
export default defineComponent({
  name: 'AppMain',
  setup () {
    const store = useStore();
    const route = useRoute();
    const cachedViews = computed(() => !store.getters.cachedViews);
    const key = computed(() => route.path);
    //console.log(cachedViews)
    return {
      cachedViews,
      key
    }
  }
})
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px);*/
  width: 100%;
  position: relative;
  /* overflow: hidden;*/
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
