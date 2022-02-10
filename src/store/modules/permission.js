import { constantRoutes, errorRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import noFind from '@/views/404.vue'
import { firstToUpper } from '@/utils'
import menu from '@/config/menu'


function getModules() {
	const components = import.meta.glob('../../views/**/*.vue')
	return function (key) {
		const filepath = `../../views${key}.vue`
		return components[filepath] || noFind
	}
}
/**
 * @description: 获取页面组件
 * @param {String} key
 */
const getModule = getModules()

/**
 * @description: 递归遍历树形菜单，得到适用于vue-router的数组
 * @param {Array} routes
 * @param {Array} data
 * @param {String} parent
 * @return: {Array}
 */
function getMenuTree(routes, data, parent) {
	data.forEach(item => {
		if (!item.filePath) {
			throw new Error('菜单文件路径不能为空')
		}
		const nameArr = item.filePath.split('/')
		let path = item.path
		if (path.substring(0, 1) !== '/') {
			path = parent + '/' + path
		}
		const menu = {
			path,
			hidden: !item.show,
			notAllowed: item.notAllowed,
			alwaysShow: item.alwaysShow,
			children: [],
			name: firstToUpper(nameArr[nameArr.length - 1]),
			meta: {
				title: item.title,
				icon: item.icon,
				tag: item.tag
			}
		}
		if (!item.show) {
			const path = item.path.split('Detail')[0]
			menu.meta.activeMenu = path
		}
		const result = item.children && item.children.length
		if (result) { // 如果有子菜单时, 重定向到第一个子菜单，继续递归子菜单
			if (parent === '') { // 只有当前为一级菜单时，才加载Layout组件，其他菜单直接重定向
				menu.component = Layout
			}
			let childPath = item.children[0].path
			if (childPath.substring(0, 1) !== '/') {
				childPath = item.path + '/' + childPath
			}
			menu.redirect = childPath
			getMenuTree(menu.children, item.children, path)
		} else {
			// 没有子菜单时，直接加载页面组件
			menu.component = getModule(item.filePath)
		}
		routes.push(menu)
	})
}


const state = {
	routes: [],
	indexPath: '/dashboard'
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.routes = constantRoutes.concat(routes).concat(errorRoutes)
	},
	RESET_ROUTES: (state) => {
		state.routes = []
	},
	SET_INDEX_PATH: (state, indexPath) => {
		state.indexPath = indexPath
	}
}

const actions = {
	generateRoutes({ commit }) {
		return new Promise(resolve => {
			// 模拟后台接口
			setTimeout(() => {
				const loadMenuData = menu
				let routes = []
				getMenuTree(routes, loadMenuData, '')
				commit('SET_ROUTES', routes)
				routes.length && commit('SET_INDEX_PATH', routes[0].path)
				resolve(routes.concat(errorRoutes))
			}, 2000)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
