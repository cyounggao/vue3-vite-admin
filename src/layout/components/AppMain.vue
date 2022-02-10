<script lang="jsx">
import Loading from './Loading.vue'
import { KeepAlive } from 'vue'
export default defineComponent({
  components: {
    Loading
  },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    let key = computed(() => {
      return route.path
    })
    let pageLoading = computed(() => {
      return store.getters.pageLoading
    })
    let cachedViews = computed(() => {
      return store.state.tagsView.cachedViews
    })
    return () => (
      <section class="main-container">
        <RouterView key={key.value}>
          {
            ({ Component }) => {
              return <KeepAlive include={cachedViews.value}>
                <Component />
              </KeepAlive>
            }
          }
        </RouterView>
        {
          pageLoading.value ? (<Loading />) : null
        }
      </section >
    )
  }
})

</script>

<style lang="scss">
.el-scrollbar-section .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
