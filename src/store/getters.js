const getters = {
  requestCount: state => state.app.requestCount,
  sidebarStatus: state => state.app.sidebarStatus,
  pageLoading: state => state.app.pageLoading,
  menuLoading: state => state.app.menuLoading,
  permissionRoutes: state => state.permission.routes,
  indexPath: state => state.permission.indexPath,
  userinfo: state => state.user.userinfo,
}
export default getters
