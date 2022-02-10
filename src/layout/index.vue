<template>
  <div :class="classObj" class="app-wrapper">
    <div class="fixed-header">
      <Navbar />
      <TagsView />
    </div>
    <Sidebar class="sidebar-container" />
    <AppMain />
  </div>
</template>

<script setup>
const store = useStore()
import { Navbar, Sidebar, AppMain, TagsView } from './components'
let classObj = computed(() => {
  return {
    hideSidebar: !store.getters.sidebarStatus,
    openSidebar: store.getters.sidebarStatus,
  }
})
</script>

<style lang="scss" scoped>
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    left: $sideBarWidth;
    z-index: 1000;
    transition: left 0.28s;
  }

  .hideSidebar .fixed-header {
    left: 54px;
  }

</style>
