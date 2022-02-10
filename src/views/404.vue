<template>
    <section flex="dir:column align:center">
        <i class="iconfont icon-yepian"></i>
        <p>
            页面找不到了，<span @click="goHome">返回首页</span>
        </p>
    </section>
</template>
<script setup>
const router = useRouter()
const store = useStore()
const goHome = () => {
    router.push(store.getters.indexPath)
}
</script>
<style lang="scss" scoped>
section {
    width: 100%;
    padding-top: 200px;
    .icon-yepian{
        font-size: 240px;
        line-height: 1;
    }
    p{
        margin-top: 30px;
        span{
            color: $mainColor;
            cursor: pointer;
        }
    }
}
</style>