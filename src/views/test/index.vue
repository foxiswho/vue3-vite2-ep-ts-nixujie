<template>
test
  <div>
    {{env.port}}
    {{env.VUE_APP_API_BASE_URL}}
    {{env.BASE_URL}}
    {{env.ENV}}
  </div>
</template>

<script>
import {ref} from "vue";
import {envs} from '@/utils/env'

export default {
  name: "index",
  setup(){
    const env= ref(envs())
    console.log(env)
    return {
      env
    }
  }
}
</script>

<style scoped>

</style>
