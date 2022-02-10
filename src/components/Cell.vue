<script lang="jsx">
export default defineComponent({
    props: {
        /**
         * left: 左边固定宽度，右边自适应
         * right: 右边固定宽度，左边自适应
         * between: 两端对齐
         */
        type: {
            type: String,
            default: 'left'
        },
        align: {
            type: String,
            default: 'stretch'
        },
        // 左边的内容，slot 名为 left
        label: {
            type: String,
            default: ''
        },
        // 固定宽度时具体的宽度，为0不设置
        width: {
            type: Number,
            default: 0
        },
        gap: {
            type: Number,
            default: 5
        },
        //右边的内容，默认插槽
        value: {
            type: [String, Number],
            default: ''
        }
    },
    setup: (props, { slots }) => {
        let { type, label, value, gap, width, align } = props
        let leftStyle = computed(() => {
            let style = {}
            if (type === 'left') {
                style.marginRight = gap + 'px'
                if (width) {
                    style.width = width + 'px'
                }
            }
            return style
        })
        let rightStyle = computed(() => {
            let style = {}
            if (type === 'right') {
                style.marginLeft = gap + 'px'
                if (width) {
                    style.width = width + 'px'
                }
            }
            return style
        })
        return () => (
            <div class="cell" flex={`justify:between align:${align}`}>
                <div class={'cell__left ' + type} style={leftStyle.value}>
                    { slots.left ? slots.left() : label }
                </div>
                <div class={'cell__right ' + type} style={rightStyle.value}>
                    { slots.default ? slots.default() : value }
                </div>
            </div>
        )
    }
})

</script>

<style lang="scss">
.cell {
    font-size: 14px;
    line-height: 24px;
    padding: 6px 0;

    .cell__left {
        color: $fontColor;
        flex-shrink: 0;
        &.right {
            flex: 1;
            flex-shrink: 1 !important;
            word-break: break-word;
        }
        &.between {
            flex-shrink: 1 !important;
        }
    }

    .cell__right {
        color: $fontColor6;
        flex-shrink: 0;
        &.left {
            flex: 1;
            flex-shrink: 1 !important;
            word-break: break-word;
        }
        &.between {
            flex-shrink: 1 !important;
        }
    }
}
</style>
