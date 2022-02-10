<template>
	<div class="navbar" flex="justify:between align:center">
		<div class="navbar-left" flex="align:center">
			<Hamburger :is-active="sidebarStatus" @toggleClick="toggleClick"></Hamburger>
			<Breadcrumb />
		</div>
		<div class="right-menu" flex="align:center">
			<el-dropdown class="avatar-container" trigger="hover" placement="bottom">
				<el-avatar
					:src="$getAssetsUrl('avatar.jpg')"
					:size="30"
				/>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<el-dropdown-item style="padding:0 10px;" @click.native="logout">
							<div flex="align:center">
								<i class="iconfont icon-tuichu2" />
								<span>退出登录</span>
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
const store = useStore()
const router = useRouter()
const route = useRoute()
let sidebarStatus = computed(() => {
	return store.getters.sidebarStatus
})
const logout = async () => {
	await store.dispatch('user/resetToken')
	router.push(`/login?redirect=${route.fullPath}`)
}
const toggleClick = () => {
	store.dispatch('app/toggleSideBar')
}
</script>

<style lang="scss" scoped>
.navbar {
	height: $headerHeight;
	overflow: hidden;
	position: relative;
	background: $whiteColor;
	border-bottom: 1px solid #eee;
	padding: 0 30px 0 0;

	.right-menu {
		height: 100%;

		&:focus {
			outline: none;
		}

		.avatar-container {
			cursor: pointer;
		}
	}
}

.user-dropdown {
	padding: 5px 10px;

	.el-dropdown-menu__item:focus,
	.el-dropdown-menu__item:not(.is-disabled):hover {
		background-color: transparent;

		span {
			color: $mainColor;
		}
	}

	.el-dropdown-menu__item {
		padding: 0;
		text-align: center;
		line-height: 40px;
	}

	.iconfont {
		text-align: center;
		width: 24px;
		height: 24px;
		line-height: 24px;
		background-color: #eeeeee;
		border-radius: 50%;
		display: inline-block;
		color: $mainColor !important;
		margin-right: 10px;
		font-size: 12px;
	}

	span {
		color: $blackColor;
	}
}
</style>
