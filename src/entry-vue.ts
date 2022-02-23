import { createApp } from 'vue'
import App from './VueApp/App.vue'
import router from './VueApp/router'
import ElementPlus from 'element-plus'
import 'element-plus/es/components/message/style/css'

const app = createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.mount('#app-vue')
