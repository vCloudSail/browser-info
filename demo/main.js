import { createApp, effect, reactive, ref } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import browserInfo from '@cloudsail/browser-info'
// import browserInfo from '@/main'

function update() {
  this.$browserInfo = ref(window.$browserInfo).value
}
const app = createApp(App)

app.mixin({
  beforeCreate() {
    window.addEventListener('uachange', update)
  },
  unmounted() {
    window.removeEventListener('uachange', update)
  }
})
app.config.globalProperties.$browserInfo = ref(window.$browserInfo).value

app.use(ElementPlus)
app.mount('#app')
