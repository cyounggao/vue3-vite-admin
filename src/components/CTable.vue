<!-- 表格 -->
<template>
    <div class="c-table">
        <div class="c-table__fifter card" v-if="$slots.filter">
            <!-- 表格筛选区域 -->
            <el-form
                ref="classFilterForm"
                :model="filterData"
                :inline="true"
                class="c-table__form"
                :size="size"
            >
                <slot name="filter"></slot>
                <el-form-item>
                    <el-button
                        :icon="Search"
                        type="primary"
                        :loading="loading"
                        @click="reload(1)"
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="c-table__content card">
            <!--表格按钮区域-->
            <div
                class="c-table__button"
                flex="align:center justify:end"
                ref="tableBtn"
                v-if="$slots.btn || !!exportConfig.api"
            >
                <slot name="btn"></slot>
                <el-button
                    v-if="!!exportConfig.api"
                    type="primary"
                    :icon="Download"
                    :loading="loadingDown"
                    @click="download"
                >导出</el-button>
            </div>
            <el-table
                ref="tableInstance"
                v-load="loading"
                class="c-table__table"
                :data="tableData"
                :size="size"
                style="width: 100%;"
                v-bind="$attrs"
            >
                <slot />
                <template #empty>
                    <div flex="dir:column align:center justify:center">
                        <p>暂无数据</p>
                    </div>
                </template>
            </el-table>
            <!-- 表格分页 -->
            <el-pagination
                v-if="paging"
                class="c-table__pagination"
                background
                flex="justify:center"
                small
                hide-on-single-page
                :current-page.sync="pageData.page"
                :page-size="pageData.limit"
                layout="total, prev, pager, next, jumper"
                :total="tableCount"
                @current-change="pageChange"
            />
        </div>
    </div>
</template>
<script setup>
import { Search, Download } from '@element-plus/icons-vue'
import { isObj } from '@/utils'

const props = defineProps({
    // 请求表格数据接口
    api: {
        required: true,
        type: Function
    },
    // 后端接口返回数据对象中，列表数据和总条数对应的数据路径
    listPath: {
        type: String,
        default: 'data.result'
    },
    totalPath: {
        type: String,
        default: 'data.total'
    },
    /**
     * 导出的配置项
     * api: 导出的接口函数，不传时不显示导出按钮
     * noPage： 导出是否不包含分页的参数
     */
    exportConfig: {
        type: Object,
        default: function () {
            return {
                api: null,
                noPage: false
            }
        }
    },
    // 分页参数
    pageData: {
        type: Object,
        default: function () {
            return {
                limit: 10,
                page: 1
            }
        }
    },
    // 筛选参数
    filterData: {
        type: Object,
        default: function () {
            return {}
        }
    },
    // 表格尺寸
    size: {
        type: String,
        default: 'small'
    },
    // 是否分页
    paging: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['load-finish'])

let state = reactive({
    tableCount: 0, // 总条数
    tableData: [], // 表格数据
    loading: false, // loading动画
    loadingDown: false
})
onMounted(() => {
    getData()
})
const getData = () => {
    state.tableData = []
    const params = getParams(props.paging)
    state.loading = true
    props.api(params).then(res => {
        state.loading = false
        // 如果有分页
        if (props.paging) {
            state.tableData = getValueByPath(res, props.listPath)
            state.tableCount = getValueByPath(res, props.totalPath)
        } else {
            state.tableData = getValueByPath(res, props.listPath)
        }
        emit('load-finish', res)
    }).catch((err) => {
        console.error(err)
        state.loading = false
    })
}
/**
 * @description 根据对象的数据路径获取值,
 * @param {Object} obj 
 * @param {String} path 
 */
const getValueByPath = (obj, path) => {
    let value = { ...obj }
    path.split('.').forEach(item => {
        if (isObj(value) && value[item] !== undefined) {
            value = value[item]
        } else {
          throw new Error(`在数据路径${path}中，${item}不存在`)
        }
    })
    return value
}
const getParams = (e) => {
    let data = { ...props.filterData }
    if (e) {
        Object.assign(data, props.pageData)
    }
    return data
}

/**
 * @description 属性表格数据，如果需要则可以获取ref实例调用这个方法
 * @param {number} e 前往第几页，不传当前页刷新
 */
const reload = (e) => {
    if (e && !(/(^[1-9]\d*$)/.test(e))) {
        e = 1
    }
    e && (props.pageData.page = e)
    getData()
}
// 导出表格数据
const download = () => {
    const data = getParams(!props.exportConfig.noPage)
    state.loadingDown = true
    props.exportConfig.api(data).then(() => {
        // 这里处理下载
        state.loadingDown = false
    }).catch(() => {
        state.loadingDown = false
    })
}
// 表格翻页
const pageChange = (page) => {
    props.pageData.page = page
    getData()
}
let { tableCount, tableData, loading, loadingDown } = toRefs(state)
// 获取ElTable实例，暴露到外部
let tableInstance = ref(null)
// 暴露出去事件、数据
defineExpose({
    tableData: tableData,
    elTable: tableInstance,
    reload
})
</script>
<style lang="scss">
.c-table {
    .c-table__form {
        ::v-deep(.el-select) {
            width: 140px;
        }
        ::v-deep(.el-form-item) {
            margin-right: 25px;
        }
    }
    .c-table__fifter {
        margin-bottom: 15px;
        position: relative;
        padding-top: 10px;
    }

    .c-table__content {
        padding: 0 0 30px 0;
        transform: translateZ(0);
    }

    .c-table__button {
        height: 60px;
        padding: 0 15px;

        .el-dropdown-link {
            cursor: pointer;
        }
    }

    .c-table__pagination {
        margin-top: 30px;
    }
    .c-table__table.el-table {
        th {
            background-color: #f9f9f9 !important;
            line-height: 24px;
            padding: 10px 0;
        }
        td {
            padding: 10px 0;
        }
        .cell {
            padding: 0 15px;
        }
        &::before {
            content: none;
        }
    }
    &.el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #fff5f1;
    }
    .el-table__body tr.hover-row > td {
        background-color: #fff5f1;
    }
}
</style>
