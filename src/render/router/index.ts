import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory} from 'vue-router'
import type { App } from 'vue'
// 引入本地图片方法
import {imgLocalUrl} from '@/render/utils/imgLocalUrl'

type RouterCustorm={
    hidden?:boolean,
}
const LayOut=()=> import('@/render/layout/index.vue')
export const constantRouterMap: (RouteRecordRaw | RouterCustorm)[] = [
    {
        path: '/load',
        name: 'Load',
        hidden: true,
        component: () => import('@/render/views/load/index.vue'),
    },   
    {
        path: '/settings',
        name: 'Settings',
        component: LayOut,
        children:[
            {
                path: '/settings',
                name: 'Settings',
                meta: {
                    title: '配置管理',
                    icon:imgLocalUrl('@/assets/layout/settings.png'),
                },
                component: () => import('@/render/views/settings/index.vue'),
            },
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: LayOut,
        children:[
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: '班级点名',
                    icon:imgLocalUrl('@/assets/layout/user.png'),
                },
                component: () => import('@/render/views/user/index.vue'),
            },
        ]
    }
]
export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}
