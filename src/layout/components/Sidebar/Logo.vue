<script lang="jsx">
import { getAssetsUrl } from '@/utils'

export default defineComponent({
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	setup: (props) => {
		const store = useStore()
		let { title } = props
		let logo = getAssetsUrl('logo.png')
		let sidebarStatus = computed(() => store.getters.sidebarStatus)
		return () => (
			<div class="sidebar-logo-container">
				<router-link key="expand" class="sidebar-logo-link" to="/">
					<img src={logo} class="sidebar-logo" />
					{sidebarStatus.value ? <p class="sidebar-title">{title}</p> : null}
				</router-link>
			</div>
		)
	}
})

</script>

<style lang="scss" scoped>
.sidebar-logo-container {
	position: relative;
	height: $headerHeight;
	line-height: $headerHeight;
	text-align: center;
	overflow: hidden;

	& .sidebar-logo-link {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		& .sidebar-logo {
			width: 24px;
		}

		& .sidebar-title {
			font-size: 16px;
			color: $sideBarText;
			padding-left: 15px;
			flex-shrink: 0;
		}
	}
}
</style>
