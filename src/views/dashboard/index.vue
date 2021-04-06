<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target="_blank" href="https://github.com/foxiswho/vue3-vite2-ep-ts-nixujie">Github Repository</a>
    <a class="document-btn" target="_blank" href="https://gitee.com/foxiswho/vue3-vite2-ep-ts-nixujie">Gitee Repository</a>
  </div>
</template>

<script>
// import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
