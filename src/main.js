import { createApp } from 'vue'
import App from './components/Index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './my_font/iconfont.css'
import {createPinia} from 'pinia'
import router from "./router.js";

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')