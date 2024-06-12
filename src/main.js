import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'echarts';

const app = createApp(App)
const pinia = createPinia();
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
