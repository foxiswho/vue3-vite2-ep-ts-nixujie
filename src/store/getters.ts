
const getters = {
	sidebar: (state: any) => state.layout.sidebar,
  logs: (state: any) => state.layout.logs,
  routes: (state: any) => state.layout.routes,
  permission_routes: (state: any) => state.layout.routes,
  device: (state: any) => state.layout.settings.device,
  size: (state: any) => state.layout.settings.size,
  theme: (state: any) => state.layout.settings.theme,
  showSettings: (state: any) => state.layout.settings.showSettings,
  tagsView: (state: any) => state.layout.settings.tagsView,
  fixedHeader: (state: any) => state.layout.settings.fixedHeader,
  sidebarLogo: (state: any) => state.layout.settings.sidebarLogo,
  errorLog: (state: any) => state.layout.errorLog,
  token: (state: any) => state.layout.token,
  userInfo: (state: any) => state.layout.userInfo,
  name: (state: any) => state.layout.userInfo.name,
  avatar: (state: any) => state.layout.userInfo.avatar,
  introduction: (state: any) => state.layout.userInfo.introduction,
  roles: (state: any) => state.layout.roles
};
export default getters;
