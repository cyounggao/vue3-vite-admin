<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
		<Loading v-if="menuLoading"/>
	</el-config-provider>
</template>
<script setup>
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	import Loading from '@/layout/components/Loading.vue'
	const store = useStore()
	let locale = ref(zhCn)
	let menuLoading = computed(() => store.getters.menuLoading)
</script>
<style lang="scss">
	#app {
		position: relative;
	}
</style>
