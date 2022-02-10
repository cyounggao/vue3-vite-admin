import md5 from 'js-md5';
import {
	isEmail
} from './validate'
/**
 * @params {String || Boolean} tiems
 *
 * @params {String} fmt
 *
 * @return {String}
 *
 * @example
 * (new Date().getTime(),"yyyy-MM-dd HH:mm:ss.S") ===> 2006-07-02 08:09:04.423
 * (new Date().getTime(),"yyyy-MM-dd E HH:mm:ss") ===> 2009-03-10 二 20:09:04
 * (new Date().getTime(),"yyyy-MM-dd EE HH:mm:ss") ===> 2009-03-10 周二 08:09:04
 * (new Date().getTime(),"yyyy-MM-dd EEE HH:mm:ss") ===> 2009-03-10 星期二 08:09:04
 * (new Date().getTime(),"yyyy-M-d h:m:s.S") ===> 2006-7-2 8:9:4.18
 */
 export function dateFormat (times, fmt) {
	if (!times) {
		return ''
	}
	times = times * 1000
	fmt = arguments[1] || 'yyyy-MM-dd HH:mm:ss'
	var date = new Date(times)

	var o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
		'H+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	var week = {
		'0': '\u65e5',
		'1': '\u4e00',
		'2': '\u4e8c',
		'3': '\u4e09',
		'4': '\u56db',
		'5': '\u4e94',
		'6': '\u516d'
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') :
			'') + week[date.getDay() + ''])
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k])
				.length)))
		}
	}
	return fmt
}
// 数字带单位   15555 => 15.5K
export function numFormat(val) {
	if (val || val === 0) {
		if (val >= 1000000000000) {
			val = (val / 1000000000000).toFixed(1) + 'T'
		} else if (val >= 1000000000) {
			val = (val / 1000000000).toFixed(1) + 'B'
		} else if (val >= 1000000) {
			val = (val / 1000000).toFixed(1) + 'M'
		} else if (val >= 1000) {
			val = (val / 1000).toFixed(1) + 'K'
		}
		return val
	} else {
		return '-'
	}
}
// 秒数转成分秒形式 90 => 01:30
export function timeFormat(val) {
	if (val || val === 0) {
		const m = parseInt(val / 60) < 10 ? '0' + parseInt(val / 60) : parseInt(val / 60)
		const s = parseInt(val % 60) < 10 ? '0' + parseInt(val % 60) : parseInt(val % 60)
		return m + ':' + s
	} else {
		return '-'
	}
}
// 数字每千位加逗号，100000 => 100,000
export function numToKilo(num) {
	if (!/^(-?\d+)(\.\d+)?$/.test(num)) {
		return num
	}
	let result = '',
		counter = 0,
		integer = '',
		negative = ''
	num = (num || 0).toString().split('.')
	if (num[0][0] === '-') {
		integer = num[0].substring(1)
		negative = '-'
	} else {
		integer = num[0]
	}
	let decimal = num.length === 2 ? num[1] : ''
	for (let i = integer.length - 1; i >= 0; i--) {
		counter++
		result = integer.charAt(i) + result
		if (!(counter % 3) && i != 0) {
			result = ',' + result
		}
	}
	result = negative + result
	return decimal ? result + '.' + decimal : result
}

// 16进制转汉字
export function utf8to16(str) {
	str = unescape(str)
	var out, i, len, c
	var char2, char3
	out = ''
	len = str.length
	i = 0
	while (i < len) {
		c = str.charCodeAt(i++)
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				out += str.charAt(i - 1)
				break
			case 12:
			case 13:
				char2 = str.charCodeAt(i++)
				out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
				break
			case 14:
				char2 = str.charCodeAt(i++)
				char3 = str.charCodeAt(i++)
				out += String.fromCharCode(
					((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
				)
				break
		}
	}

	return out
}
// 判断是否为对象
export function isObj(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
// 判断是否为数组
export function isArr(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
// 判断是否为字符串
export function isStr(str) {
	return str + '' === str
}
// 数组转映射对象（后端需要同时要传label和code）
export function arrToObj(arr, label = 'label', code = 'code') {
	const obj = {}
	arr.forEach(item => {
		obj[item[code]] = item[label]
	})
	return obj
}
// 判读值是否为空
export function isEmpty(val) {
	if (!val) {
		return true
	}
	for (const key in val) {
		return false
	}
	return true
}
// 字符串首字符转为大写
export function firstToUpper(str) {
	if (str.length) {
		return str.replace(str[0], str[0].toUpperCase())
	}
	return str
}
// 取数组的第一项,没有第一项返回result
export function getArrOne(arr, result = '') {
	if (Object.prototype.toString.call(arr) === '[object Array]' && arr.length) {
		return arr[0]
	} else {
		return result
	}
}
//获取对象属性的值
export function getObjKeyVal(obj, key) {
	if (Object.prototype.toString.call(obj) === '[object Object]') {
		return obj[key] || ''
	} else {
		return ''
	}
}
export function encrypt(text) {
	return md5(text + '#@%^&*')
}
// 在新开页面跳转
export function newPage(obj) {
	const {
		href
	} = this.$router.resolve(obj)
	window.open(href, '_blank')
}
// 处理链接
export function handleLink(link) {
	if (isEmail(link)) {
		return 'mailto:' + link
	}
	if (link.indexOf('//') === -1) {
		return '//' + link
	}
	return link
}

/**
 * @description 将vite获取到的scss变量字符串转成对象
 * @param {String} str 
 */
export function getScssObj(str) {
	let arr = []
	try {
		arr = str.replace(/\s*/g, "").match(/{(\S*);}/)[1].split(';')
	} catch (e) {
		console.error(e)
	}
	let obj = {}
	arr.forEach(item => {
		let a = item.split(':')
		if (a.length > 1) {
			obj[a[0]] = a[1]
		}
	})
	return obj
}
/**
 * @description 在JS中获取当前资源assets的路径
 * @param {String} name 
 */
export function getAssetsUrl(name) {
	return new URL(`../assets/images/${name}`, import.meta.url).href
}