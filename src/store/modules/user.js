import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: getToken(),
		userInfo: {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo
	}
}

const actions = {
	login({ commit }, formData) {
		const { username, password } = formData
		return new Promise((resolve, reject) => {
			if (username === 'admin' && password === '123456') {
				const data = 'token'
				commit('SET_TOKEN', data)
				setToken(data)
				resolve()
			} else {
				ElMessage.error('账号密码错误')
				reject(error)
			}
		})
	},
	// 获取用户信息
	userInfo({ commit }) {
		return new Promise((resolve, reject) => {
			userInfo().then(response => {
				const { data } = response
				commit('SET_USER_INFO', data)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	resetToken({ commit }) {
		return new Promise(resolve => {
			removeToken()
			resetRouter()
			commit('RESET_STATE')
			commit('permission/RESET_ROUTES', '', {
				root: true
			})
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
