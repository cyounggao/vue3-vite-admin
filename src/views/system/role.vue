<template>
    <div class="container">
        <CTable :api="getData" row-key="filePath" ref="cTable" @load-finish="loadFinish">
            <template #filter>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
            </template>
            <el-table-column label="测试">111</el-table-column>
            <el-table-column label="测试">222</el-table-column>
            <el-table-column label="测试">333</el-table-column>
        </CTable>
    </div>
</template>
<script setup>
// 模拟后端接口
const getData = () => {
    return new Promise((resove, reject) => {
        setTimeout(() => {
            resove({
                data: {
                    result: [{},{},{}],
                    total: 11
                }
            })
        }, 2000)
    })
}
// 获取ref
const cTable = ref(null)
nextTick(() => {
    // 刷新数据
    // cTable.value.reload()
    // el-table实例
    console.log(cTable.value.elTable)
})
// 加载完成回调
const loadFinish = (res) => {
    console.log(res)
}
</script>