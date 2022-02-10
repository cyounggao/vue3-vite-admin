import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	getToken
} from '@/utils/token'
NProgress.configure({
	showSpinner: false
})
function addRoutes(RouterList) {
	RouterList.forEach(item => {
		router.addRoute(item)
	})
}
// whiteMap里面的项，不管是否登录都可以进入
const whiteMap = {
	Test: true,
	Error: true
}
//blackMap里面的项只有登录前才能进入，登录后进入会重定向到内页
const blackMap = {
	Login: true
}
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	const hasToken = getToken()
	if (hasToken) {
		if (blackMap[to.name]) {
			const indexPath = store.getters.indexPath
			next({
				path: indexPath,
				query: {
					...to.query
				}
			})
			NProgress.done()
		} else {
			const hasMenu = !!store.getters.permissionRoutes.length
			if (hasMenu) {
				next()
			} else {
				try {
					// 打开菜单获取时的动画
					store.commit('app/SET_MENU_LOADING', true)
					const res = await store.dispatch('permission/generateRoutes')
					addRoutes(res)
					next({
						...to,
						replace: true
					})
				} catch (error) {
					console.error(error)
					store.commit('app/SET_MENU_LOADING', false)
					await store.dispatch('user/resetToken')
					next(`/login?redirect=${to.fullPath}`)
					NProgress.done()
				}
			}
		}
	} else {
		if (blackMap[to.name] || whiteMap[to.name]) {
			next()
		} else {
			await store.dispatch('user/resetToken')
			next(`/login?redirect=${to.fullPath}`)
			NProgress.done()
		}
	}
})

router.afterEach((to, from) => {
	NProgress.done()
	store.commit('app/SET_MENU_LOADING', false)
})
