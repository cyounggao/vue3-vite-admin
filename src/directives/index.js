export default {
	install(app) {
		/**
		 * 点击操作二次弹窗确认
		 * v-confirm="{title: '', fun: '', data: ''}"
		 * title: 弹窗的内容
		 * fun: 绑定的函数
		 * data: 函数传递的参数
		 */
		app.directive('confirm', function (el, { value = {}, title = '您确定要继续操作吗?' }) {
			el.onclick = function () {
				ElMessageBox.confirm(title, '提示', {
					type: 'warning'
				}).then(() => {
					value.data ? value.fun(value.data) : value.fun()
				}).catch(() => {

				})
			}
		})
		let loadingInstance = null
		// 自动引入element-plus v-loading无法使用，这里手动定义一个 v-load
		app.directive('load', {
			updated(el, binding) {
				if (binding.value && !loadingInstance) {
					loadingInstance = ElLoading.service({
						target: el,
						lock: true,
						text: '加载中',
						// customClass: 'loading--love'
					})
				} if (!binding.value && loadingInstance) {
					loadingInstance.close()
					loadingInstance = null
				}
			}
		})
	}
}
