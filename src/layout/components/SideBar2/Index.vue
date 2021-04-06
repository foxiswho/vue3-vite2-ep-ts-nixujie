<template>
  <div class="sidebar-container has-logo">
    <Logo/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
				<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex'
import SidebarItem from '@/layout/components/SideBar2/SideBarItem.vue'
import Logo from '@/layout/components/SideBar2//Logo.vue';

export default defineComponent({
	components: { Logo, SidebarItem },
	// computed: {
	// 	...mapGetters(['sidebar', 'routes'])
	// },
	setup () {
		const store = useStore()
		const route = useRoute()
		const activeMenu = computed(() => {
			const { meta, path } = route
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path;
		});
		//console.log('activeMenu',activeMenu)
		//console.log('activeMenu',activeMenu)
		const isCollapse = computed(() => !store.getters.sidebar.opened);
		// console.log(mapState(['permission']), 'mapState');
    //console.log('store.getters',store.getters)
    //console.log(store.getters.routes)
		const routes = computed(() => {
      if(store.getters.routes && store.getters.routes.length>0) {
        return  store.getters.routes
      }
      return []
    });
		// const r = computed(() => mapGetters(['routes']));
		//console.log(mapGetters(['routes']));
		const handleOpen = () => {
			// to do
		};
		const handleClose = () => {
			// to do
		};
		return {
			handleOpen,
			handleClose,
			isCollapse,
			routes,
			activeMenu
		};
	}
});
</script>
