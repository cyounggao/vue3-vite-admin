/**
 * @description 下载文件
 * @param {string} url 文件地址，可以是base64
 * @param {function} fun 执行完成后的回调函数
 * @param {string} fileName 文件名，可以通过文件地址自动获取
 */
function downFile(url, fun, fileName) {
	// base64地址
	if (url.substring(0, 5) === 'data:') {
		// base64生产blob
		let bstr = atob(url.split(',')[1])
		let n = bstr.length
		let u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		let blob = new Blob([u8arr])
		saveFile(blob, fileName, fun)
	}
	// 网络链接
	else {
		url = url + '?time=' + new Date().getTime()
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.onload = function(e) {
			if (xhr.status === 200) {
				fileName = fileName || getFileName(url)
				const blob = new Blob([xhr.response])
				saveFile(blob, fileName, fun)
			} else {
				fun && fun()
				window.open(url)
			}
		}
		xhr.onerror = function(e) {
			fun && fun()
			window.open(url)
		}
		xhr.send()
	}
}
/**
 * 保存文件
 */
function saveFile(blob, fileName, fun) {
	const userAgent = navigator.userAgent
	if (userAgent.indexOf('Edge') === -1 && userAgent.indexOf('Trident') === -1) { // 非ie下载
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		link.click()
		URL.revokeObjectURL(link.href) // 释放URL 对象
		document.body.removeChild(link)
	} else {
		navigator.msSaveBlob(blob, fileName)
	}
	fun && fun()
}
// 根据url获取文件名
function getFileName(url) {
	const num = url.lastIndexOf('/') + 1
	let fileName = url.substring(num)
	fileName = decodeURI(fileName.split('?')[0])
	return fileName
}
export default downFile
