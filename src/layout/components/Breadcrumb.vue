<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span
                v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                class="no-redirect"
            >{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import pathToRegexp from 'path-to-regexp'
const route = useRoute()
const router = useRouter()
let routerMap = {}
let levelList = ref([])

const getRouterMap = () => {
    router.getRoutes().forEach(item => {
        item.name && (routerMap[item.name] = item)
    })
    getBreadcrumb()
}
onBeforeMount(() => {
    getRouterMap()
})
watch(() => route.path, () => {
    getBreadcrumb()
})
const getBreadcrumb = () => {
    // only show routes with meta.title
    levelList.value = route.matched.filter(item => item.meta && item.meta.title && item.meta
        .breadcrumb !== false)
    const last = levelList.value[levelList.value.length - 1]
    if (last) {
        if (last.name.indexOf('Detail') > -1) {
            const route = routerMap[last.name.split('Detail')[0]]
            route && (levelList.value.splice(levelList.value.length - 1, 0, route))
        }
    }
    if (levelList.value.length === 1) {
        levelList.value = [{
            path: '/',
            meta: {
                title: '首页'
            }
        }].concat(levelList.value)
    }
}
const handleLink = (item) => {
    const {
        redirect,
        path
    } = item
    if (redirect) {
        router.push(redirect)
        return
    }
    router.push(pathCompile(path))
}
const pathCompile = (path) => {
    const {
        params
    } = route
    var toPath = pathToRegexp.compile(path)
    return toPath(params)
}
</script>