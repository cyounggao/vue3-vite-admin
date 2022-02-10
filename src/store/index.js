import getters from './getters'
const modulesFiles = import.meta.globEager('./modules/*.js')
let modules = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}

const store = createStore({
  modules,
  getters
})
export default store
