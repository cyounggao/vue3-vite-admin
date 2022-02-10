<script lang="jsx">
export default defineComponent({
    props: {
        value: {
            type: String,
            default: ''
        },
        row: {
            type: [Number, String],
            default: 0
        },
        width: {
            type: String,
            default: '100%'
        }
    },
    setup: (props) => {
        let { value, row, width } = props
        let isShowHover = ref(false)
        let textStyle = ref({
            width
        })
        // 获取ref
        const text = ref('')
        const textShow = (el) => {
            text.value = el
        }
        // 计算样式
        const getStyle = (val) => {
            let lineHeight = getComputedStyle(text.value).lineHeight.replace('px', '') - 0
            let height = getComputedStyle(text.value).height.replace('px', '') - 0
            if (height > lineHeight * val) {
                isShowHover.value = true
                textStyle.value = {
                    height: `${lineHeight * val}px`,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    webkitLineClamp: val,
                    webkitBoxOrient: 'vertical',
                    cursor: 'pointer',
                    width
                }
            } else {
                isShowHover.value = false
                textStyle.value = {
                    cursor: 'text',
                    width
                }
            }
        }
        onMounted(() => {
            getStyle(row)
        })
        return () => (
            isShowHover.value
                ? <el-tooltip content={value} placement="bottom" effect="light" show-arrow={false}>
                    <div ref={textShow} style={textStyle.value}>{value}</div>
                </el-tooltip>
                : <div ref={textShow} style={textStyle.value}>{value}</div>
        )
    }
})
</script>