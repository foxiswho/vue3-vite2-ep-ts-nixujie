<template>
test 环境变量
  <div>
    env.MODE:{{env.MODE}}
  </div><div>
    env.PORT:{{env.PORT}}
  </div>
  <div>
    env.PORT_STRING:{{env.PORT_STRING}}
  </div>
  <div>
    env.APP_BASE_API:{{env.APP_BASE_API}}
  </div>
  <div>
    env.APP_BASE_URL:{{env.APP_BASE_URL}}
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
