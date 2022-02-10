<script lang="jsx">
export default defineComponent({
    props: {
        // 圆点的个数
        num: {
            type: Number,
            default: 3
        },
        //圆点的尺寸 px
        size: {
            type: Number,
            default: 12
        },
        //圆点的颜色
        color: {
            type: String,
            default: ''
        }
    },
    setup: (props) => {
        const { num, size, color } = props

        let style = computed(() => {
            return {
                backgroundColor: color,
                width: size + 'px',
                height: size + 'px'
            }
        })
        let spans = []
        for (let i = 0; i < num; i++) {
            spans.push(<span class="loading__dot" style={style.value}></span>)
        }
        return () => (
            <div class="loading">
                {spans}
            </div >
        )
    }
})
</script>
<style lang="scss">
.loading {
    @keyframes ball-beat {
        50% {
            opacity: 0.2;
            transform: scale(0.75);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .loading__dot {
        display: inline-block;
        vertical-align: bottom;
        border-radius: 50%;
        margin: 3px;
        animation-fill-mode: both;
        animation: ball-beat 0.7s 0s infinite linear;
        background-color: $mainColor;
    }

    .loading__dot:nth-child(2n-1) {
        animation-delay: 0.35s;
    }
}
</style>