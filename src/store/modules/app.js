import Cookies from 'js-cookie'

const state = {
  sidebarStatus: !(Cookies.get('sidebarStatus') && Cookies.get('sidebarStatus') === 'false'),
  pageLoading: false, // 页面加载
  menuLoading: false, // 资源菜单获取时的状态
  requestCount: 0, // 网络请求计数
  pendingRequest: {} //处在pending中的请求
}

const mutations = {
  // 修改网络请求计数
  CHANGE_COUNT: (state, val) => {
    state.requestCount = val
  },
   // 修改网络请求计数
  CHANGE_REQUEST: (state, val) => {
    state.pendingRequest = val
  },
  // 打开页面加载
  OPEN_LOADING: (state) => {
    state.pageLoading = true
  },
  // 关闭页面加载
  CLOSE_LOADING: (state) => {
    state.pageLoading = false
  },
  SET_MENU_LOADING: (state, val) => {
    state.menuLoading = val
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebarStatus = !state.sidebarStatus
    Cookies.set('sidebarStatus', state.sidebarStatus)
  }
}

const actions = {
  toggleSideBar({ commit }, opened) {
    commit('TOGGLE_SIDEBAR', opened)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
