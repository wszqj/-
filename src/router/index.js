import {createRouter, createWebHistory} from 'vue-router'
// 导入组件
import dataReportVue from '@/view/DataReport.vue'
import bookVue from '@/view/Book.vue'
import bookCategoryVue from '@/view/BookCategory.vue'
import RecordVue from '@/view/Record.vue'
import LoginVue from '@/view/Login.vue'
import LayOutVue from '@/LayOut.vue'

const routes = [
    {path: '/login', component: LoginVue},
    {
        path: '/', component: LayOutVue, redirect: '/customer',
        children: [
            {path: '/dataReport', component: dataReportVue},
            {path: '/bookList', component: bookVue},
            {path: '/bookCategory', component: bookCategoryVue},
            {path: '/customer', component: RecordVue},
        ]
    },
    {path: '/:catchAll(.*)', redirect: '/login'}
]
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
//导出路由
export default router