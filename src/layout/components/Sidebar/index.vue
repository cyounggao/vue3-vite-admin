<template>
  <div>
    <Logo :title="setting.title" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="myElMenu"
        :default-active="activeMenu"
        :collapse="sidebarStatus"
        :background-color="variablesObj.sideBarBg"
        :text-color="variablesObj.sideBarText"
        :active-text-color="variablesObj.sideBarTextActive"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
const store = useStore()
const route = useRoute()
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import setting from '/setting'
// 获取scss变量
import variables from '@/styles/variables-export.scss'
import { getScssObj } from '@/utils'
const variablesObj = getScssObj(variables)

let permissionRoutes = computed(() => {
  return store.getters.permissionRoutes
})
let activeMenu = computed(() => {
  const { meta, name } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return name
})
let sidebarStatus = computed(() => {
  return !store.getters.sidebarStatus
})
</script>
