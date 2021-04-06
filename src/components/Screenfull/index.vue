<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
  </div>
</template>

<script lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue";
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  setup() {
    let isFullscreen = ref(false)
    function click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }

    function change() {
      isFullscreen = screenfull.isFullscreen
    }

    function init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    }

    function destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }

    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      destroy()
    })
    return {
      isFullscreen,
      click
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
