import { createApp, effect, reactive, ref } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
// import browserInfo from '@cloudsail/browser-info'
import browserInfo from '@/main'

const app = createApp(App)




app.config.globalProperties.$browserInfo = reactive(window.$browserInfo)

app.use(ElementPlus)
app.mount('#app')
