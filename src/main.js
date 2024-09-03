//每次刷新main.js都會從頭到尾跑一遍

import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from './router'
//會自動讀index.js

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//不考慮全局引入造成性能損耗的話直接在main.js引就好。引入ElementPlus

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入圖標

import {createPinia} from 'pinia'
const pinia=createPinia()
//引入並創造pinia實例

import '@/api/mock.js'
//啟動本地的mock假數據，當發起ajax請求時，會自動攔截

import api from '@/api/api'
//引入，並在下方將api註冊到全局

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//註冊圖標

app.config.globalProperties.$api = api;

app.use(router).use(pinia).use(ElementPlus).mount('#app')

//--------------記得要use(pinia)之後才能進行sotre的存取
import { useAllDataStore } from './stores'
const store=useAllDataStore()
store.addMenu(router,'refresh')



//也可以單獨寫成一個guard.js，只是記得要引入到main.js
router.beforeEach((to,from)=>{
    //去往login以外的地方且沒有token的時候
    // if(to.path!=='/login' && !store.state.token){
    //     return {name:'login'}
    // }

    if(!store.state.token){
        //沒有token又不去login的時候，強制跳轉，並無法留下歷史記錄
        if(to.path!=='/login'){
            return {name:'login',replace:true}
        }
    }else{
        //有token又想去login的時候
        if(to.path=='/login'){
            return {name:'main',replace:true}
        }
    }
})

//掛完路由要有地方顯示，記得在app.vue加上router-view
