import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";

//制定路由規則

const routes = [
    {
        path:'/',
        name:'main',
        redirect:'/home',
        component:()=>import("@/views/Main.vue"),
        children:[
            {
                path:'/:catchAll(.*)',
                name:'404',
                component:()=>import("@/views/404.vue"),
            },
        ]
        //記得不是components不必加s
        //因為有子路由，要在home組件中也要加上router-view

        //子路由因為後續動態路由所以註釋掉
        // children:[
        // {
        //     path:'/home',
        //     name:'home',
        //     component:()=>import("@/views/Home.vue"),
            
        // },
        // {
        //     path:'/user',
        //     name:'user',
        //     component:()=>import("@/views/User.vue"),
        // },
        // {
        //     path:'/mall',
        //     name:'mall',
        //     component:()=>import("@/views/Mall.vue"),
        // },
        // ]
    },
    {
        path:'/login',
        name:'login',
        component(){return import("@/views/Login.vue")},
        //compotnent裡面除了直接放組件以外，也能放一個函數，函數要return import(組件路徑)
    },
]

const router = createRouter({
    //設置路由的模式
    history:createWebHistory(),
    routes
})

export default router