import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
	{
		path: '/',
		redirect: '/login',
		hidden: true,
		meta: {
			hiddenTag: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue'),
		hidden: true,
		meta: {
			hiddenTag: true
		}
	},
	{
		path: '/404',
		name: 'Error',
		component: () => import('@/views/404.vue'),
		hidden: true,
		meta: {
			hiddenTag: true
		}
	},
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		meta: {
			hiddenTag: true
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect.vue'),
				meta: {
					hiddenTag: true
				}
			}
		]
	}
]
// vue-router 4.0 对404配置进行了修改,必须要使用正则匹配
export const errorRoutes = [{
	path: '/:pathMatch(.*)',
	redirect: '/404',
	hidden: true
}]

const createRouterFun = () => createRouter({
	history: createWebHashHistory(),
	// history: createWebHistory(),
	routes: constantRoutes,
	scrollBehavior: () => ({ top: 0 })
})

const router = createRouterFun()

export function resetRouter() {
	const newRouter = createRouterFun()
	router.matcher = newRouter.matcher
}
export default router
