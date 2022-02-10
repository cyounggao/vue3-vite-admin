import {
	createApp
} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import directives from './directives'
import * as utils from './utils'
import './permission'
import '@/assets/iconfont/iconfont.css'
import '@/styles/index.scss'
const app = createApp(App)
Object.keys(utils).forEach(key => {
	app.config.globalProperties['$' + key] = utils[key]
})
app.use(directives)
app.use(store)
app.use(router)
app.mount('#app')
