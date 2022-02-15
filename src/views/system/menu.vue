<template>
    <div class="container">
        <CTable :api="getData" row-key="filePath" ref="cTable" @load-finish="loadFinish">
            <template #filter>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
            </template>
            <el-table-column label="菜单名" prop="title"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="文件路径" prop="filePath"></el-table-column>
        </CTable>
    </div>
</template>
<script setup>
import menu from '@/config/menu';
// 模拟axios请求
const getData = () => {
    return new Promise((resove, reject) => {
        setTimeout(() => {
            resove({
                data: {
                    result: menu,
                    total: 11
                }
            })
        }, 2000)
    })
}
const cTable = ref(null)
nextTick(() => {
    console.log(cTable.value.elTable)
})
const loadFinish = (res) => {
    console.log(res)
}
</script>
<style lang="scss" scoped>
</style>