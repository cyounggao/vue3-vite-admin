<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="(tag, index) in visitedViews"
        :ref="tagItem"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag, index) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event, index)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="iconfont icon-cha"
          @click.prevent.stop="closeSelectedTag(tag, index)"
        />
        <i class="tag" v-if="tag.tag">{{ tag.tag }}</i>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag, selectedTagIndex)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script setup>
import ScrollPane from './ScrollPane.vue'
import path from 'path'
const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()
const router = useRouter()
let state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  selectedTagIndex: 0,
  affixTags: []
})
const visitedViews = computed(() => store.state.tagsView.visitedViews)
const routes = computed(() => store.getters.permissionRoutes)
const tagList = ref([])
const tagItem = (el) => {
  if (tagList.value.indexOf(el) === -1 && el) {
    tagList.value.push(el)
  }
}
watch(() => route.path, () => {
  addTags()
  moveToCurrentTag()
})
watch(() => state.visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
const closeMenu = () => {
  state.visible = false
}

provide('tagList', tagList)
onMounted(() => {
  initTags()
  addTags()
})
const isActive = (tag) => {
  return tag.path === route.path
}
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = state.affixTags = filterAffixTags(routes.value)
  for (const tag of affixTags) {
    const { hiddenTag } = tag.meta
    if (!hiddenTag) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}
const addTags = () => {
  const { hiddenTag } = route.meta
  if (!hiddenTag) {
    store.dispatch('tagsView/addView', route)
  }
  return false
}
let scrollPane = ref(null)
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const key of tagList.value) {
      if (key.to.path === route.path) {
        scrollPane.value.moveToTarget(key)
        // when query is different then update
        if (key.to.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
        break
      }
    }
  })
}
const refreshSelectedTag = (view) => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}
const closeSelectedTag = (view, index) => {
  tagList.value.splice(index, 1)
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  router.push(state.selectedTag)
  store.dispatch('tagsView/delOthersViews', state.selectedTag).then(() => {
    moveToCurrentTag()
  })
}
const closeAllTags = (view) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (state.affixTags.some(tag => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}
const openMenu = (tag, e, index) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }

  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
  state.selectedTagIndex = index
}
const handleScroll = () => {
  closeMenu()
}
let { visible, top, left, selectedTag } = toRefs(state)

</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 36px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      border-radius: 2px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      .icon-cha {
        font-size: 12px;
      }
      .tag {
        font-size: 12px;
        line-height: 1;
        padding: 4px 5px;
        border-radius: 6px;
        background: #f40;
        color: $whiteColor;
        transform: scale(0.6);
        position: absolute;
        right: -20px;
        top: -10px;
        z-index: 10;
      }
      &.active {
        background-color: $mainColor;
        color: #fff;
        border-color: $mainColor;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
