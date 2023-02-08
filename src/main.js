import { createApp } from 'vue'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 初始化样式表
import '@/styles/index.scss'

// 导入svg icon
import installIcons from '@/icons'

// 导入路由鉴权
import './permission'

// 全局属性
import installFilter from '@/filters'

// 指令
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
