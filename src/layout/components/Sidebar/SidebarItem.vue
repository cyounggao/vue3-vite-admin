<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && ($isEmpty(onlyOneChild.children) || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <el-menu-item
        :index="onlyOneChild.name"
        :class="{ 'submenu-title-noDropdown': !isNest }"
        @click.native="menuClick(item)"
      >
        <Icon :icon="onlyOneChild.meta?.icon || item.meta?.icon" />
        <template #title>
          {{ onlyOneChild.meta?.title }}
          <span class="menu-tag" v-if="onlyOneChild.meta?.tag">{{ onlyOneChild.meta?.tag }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu ref="subMenu" v-else :index="item.name" popper-append-to-body>
      <template #title>
        <Icon :icon="item.meta?.icon" />
        <span class="title">
          {{ item.meta?.title }}
          <span class="menu-tag" v-if="item.meta?.tag">{{ item.meta?.tag }}</span>
        </span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
const router = useRouter()
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import Icon from './Icon.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
let onlyOneChild = ref({})
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = {
      ...parent,
      path: '',
      noShowingChildren: true
    }
    return true
  }
  return false
}
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
// 点击菜单
const menuClick = (item) => {
  router.push(item.path)
}
</script>
<style lang="scss" scoped>
@keyframes shrink {
  25% {
    transform: scale(0.7);
  }
  50% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.8);
  }
}
.menu-tag {
  font-size: 12px;
  line-height: 1;
  padding: 3px 5px;
  border-radius: 7px;
  border-bottom-left-radius: 0px;
  background: #f40;
  color: $whiteColor;
  display: inline-block;
  transform: scale(0.8);
  position: relative;
  top: -4px;
  left: 5px;
  animation-fill-mode: both;
  animation: shrink 1.2s 0s infinite linear;
}
</style>