<template>
	<div class="login">
		<div class="login-wrap card">
			<h2>欢迎使用~</h2>
			<h3>{{ setting.title }}</h3>
			<el-form ref="loginForm" :model="loginData" class="user-form" :rules="loginRules">
				<el-form-item prop="username">
					<el-input
						v-model="loginData.username"
						type="text"
						clearable
						prefix-icon="el-icon-user-solid"
						placeholder="请输入用户名"
					/>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						v-model="loginData.password"
						type="password"
						clearable
						placeholder="请输入登录密码"
						prefix-icon="el-icon-lock"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 100%;" :loading="loading" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup>
import setting from '/setting'
import { utf8to16 } from '@/utils'
import { onBeforeUnmount } from 'vue';
const route = useRoute()
const router = useRouter()
const store = useStore()
onMounted(() => {
	// 监听回车键
	document.onkeydown = () => {
		const keyCode = window.event.keyCode;
		if (keyCode === 13) {
			login()
		}
	}
})
onBeforeUnmount(() => {
	document.onkeydown = undefined
})
const loginRules = {
	username: [
		{
			required: true,
			message: "请输入用户名",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "输入登录密码",
			trigger: "blur",
		},
	]
}
let loginData = reactive({
	username: "",
	password: ""
})

let loading = ref(false)
let loginForm = ref(null)
// 登录重定向
let indexPath = computed(() => store.getters.indexPath)
let redirect = ''
const arr = route.fullPath.split("redirect=")
if (arr.length === 2) {
	redirect = utf8to16(arr[1])
}
redirect = redirect || indexPath.value
const login = () => {
	loginForm.value.validate((valid) => {
		if (valid) {
			loading.value = true
			store.dispatch("user/login", loginData).then(() => {
				loading.value = false
				router.push({
					path: redirect
				})
			}).catch(() => {
				loading.value = false
			})
		} else {
			return false
		}
	})
}

</script>

<style scoped lang="scss">
.login {
	height: 100vh;
	background-color: $sideBarBg;
	position: relative;
}
.login-wrap {
	@include css3Center;
	width: 440px;
	padding: 20px 50px;
}

h2 {
	font-size: 24px;
	font-weight: normal;
	color: $fontColor;
	line-height: 1.8;
}

h3 {
	font-size: 16px;
	font-weight: normal;
	color: $fontColor;
	margin-bottom: 20px;
}

.tips {
	line-height: 1;
	font-size: 12px;
	position: relative;
	top: -10px;

	span {
		cursor: pointer;
	}

	&.tips1 {
		font-size: 14px;
		text-align: center;
		margin-top: 63px;

		span {
			color: $mainColor;
		}
	}
}
</style>
