import axios from 'axios'
import store from '../store'
import qs from 'qs'
import { utf8to16 } from './index'
import host from '@/config'
import {
	getToken
} from './token.js'

let lock = false
const request = axios.create({
	baseURL: host.api, // url = base url + request url
	withCredentials: true, // 是否在跨域请求时发送Cookie
	timeout: 5000 // 超时时间
})
// 发请求之前
/**
 * config参数
 * noLoad: 请求是否不显示加载，默认显示。通过记录请求的个数，判断开启加载和关闭加载。当发起请求时，计数+1，请求完成时计数-1，若请求完成时计数为0，则关闭加载
 * method: 请求方式，默认post
 * formData: post时参数是否用form-data形式传，默认json形式
 * data: 请求的参数
 * seq： axios串联时的先后顺序，f:第一个(执行完毕后计数不减1) / m:中间的(请求发起时计数+1，完成时计数-1) / l:最后一个(执行前计数不加1),默认m
 * download:  开启文件下载
 */
request.interceptors.request.use(
	config => {
		config.headers['Authorization'] = getToken()
		config.headers['language'] = store.getters.language
		config.method = config.method || 'post'
		config.seq = config.seq || 'm'
		// 下载文件时设置responseType
		if (config.download) {
			config.responseType = 'blob'
		}
		// get请求，对于参数为数组时要序列化成 id: [1,2] / id=1&id=2 形式
		if (config.method === 'get') {
			config.params = qs.stringify(config.data, {
				indices: false
			})
			config.paramsSerializer = function (params) {
				return params
			}
		}
		// form-data形式传参要序列化
		else if (config.method === 'post' && config.formData) {
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			config.data = qs.stringify(config.data)
		}
		if (
			(config.seq === 'm' || config.seq === 'f') &&
			!config.noLoad
		) {
			store.commit('app/CHANGE_COUNT', store.getters.requestCount + 1)
			if (store.getters.requestCount > 0) {
				store.commit('app/OPEN_LOADING')
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
// 请求完成
request.interceptors.response.use(
	response => {
		if (
			(response.config.seq === 'm' ||
				response.config.seq === 'l') &&
			!response.config.noLoad
		) {
			store.commit('app/CHANGE_COUNT', store.getters.requestCount - 1)
			if (store.getters.requestCount === 0) {
				store.commit('app/CLOSE_LOADING')
			}
		}
		const res = response.data
		// 执行下载操作
		if (response.config.download) {
			// 拿到文件名
			const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
			const filename = utf8to16(temp)
			const userAgent = navigator.userAgent
			// 非ie下载
			if (userAgent.indexOf('Edge') === -1 && userAgent.indexOf('Trident') === -1) {
				const url = URL.createObjectURL(res)
				const link = document.createElement('a')
				link.style.display = 'none'
				link.href = url
				link.setAttribute('download', filename)
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
			} else {
				navigator.msSaveBlob(res, filename)
			}
			return res
		} else {
			// 只有code为0才返回数据，code为其他直接弹出错误提示
			if (res.code === 0) {
				return res
			} else {
				ElMessage.error({
					message: res.msg || '网络开小差了！',
					duration: 1.5 * 1000
				})
				return Promise.reject(res)
			}
		}
	},
	error => {
		const response = error.response || { config: {} }
		if (
			(response.config.seq === 'm' ||
				response.config.seq === 'l') &&
			!response.config.noLoad
		) {
			store.commit('app/CHANGE_COUNT', store.getters.requestCount - 1)
			if (store.getters.requestCount === 0) {
				store.commit('app/CLOSE_LOADING')
			}
		}
		const res = response.data || {}
		if (res.code === 401) {
			if (!lock) {
				lock = true
				ElMessageBox.confirm(res.msg || '登录超时，请重新登录！', '提示', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					store.dispatch('user/resetToken').then(() => {
						lock = false
						location.reload()
					})
				}).catch(() => {
					lock = false
				})
			}
		} else {
			ElMessage.error({
				message: res.msg || '网络开小差了！',
				duration: 2 * 1000
			})
		}
		return Promise.reject(res)
	}
)

export default request