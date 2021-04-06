<script lang="ts">
import { h } from 'vue'
export default {
  name: 'AuthRedirect',
  setup() {
    const hash = window.location.search.slice(1)
    if (window.localStorage) {
      window.localStorage.setItem('x-admin-oauth-code', hash)
      window.close()
    }
    return {}
  },
  render() {
    return h() // avoid warning message
  }
}
</script>
