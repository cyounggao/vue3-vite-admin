<script lang="jsx">
export default defineComponent({
	props: {
		icon: {
			type: String,
			default: ''
		}
	},
	setup: (props) => {
		const { icon } = props
		return () => (
			icon ?
				icon.includes('icon') ?
					(<i class={[icon, 'sub-el-icon iconfont']} />
					) : (
						<img src={icon} class='sub-el-icon' />
					)
				: null
		)
	}
})
</script>