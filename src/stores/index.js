import {defineStore} from 'pinia'
import {ref,watch} from 'vue'

function initState(){
    return {
        isCollapse:false,
        tags:[
            {
                path:'/home',
                name:'home',
                label:'首頁',
                icon:'home'
            }
        ],
        currentMenu:null,
        menuList:[],
        token:'',
        routerList:[]
    }
}

function resetRouter(router){
            //刪除舊的子路由，重置路由為最基本的main和login，處理多帳號路由問題(高權限留下來的路由被低權限帳號使用)
            let routers = router.getRoutes()  //列出當前的所有路由
            routers.forEach(i=>{
                if(i.name=='main'||i.name=='login'||i.name=='404'){
                    return
                }else{
                    router.removeRoute(i.name)
                }
            })
}

export const useAllDataStore = defineStore('allData',()=>{
    //pinia也可以直接使用組合式函數的寫法
    //ref類似於之前的state屬性
    //computed 為以前的getters
    //function 為acions

    const state = ref(initState());

    const isCollapse2 = ref(false)

    watch(state,(newObj)=>{
        if(!newObj.token) return
        localStorage.setItem('store',JSON.stringify(newObj))
    },{deep:true})

    const selectMenu= val=>{
        if(val.name==='home'){
            state.value.currentMenu=null
        }else{
            state.value.currentMenu= val
            //判斷標籤是否已在標籤列，不在的話就加入
            let index = state.value.tags.findIndex(item=>item.name===val.name)
            index===-1? state.value.tags.push(val):''
        }
    }

    const updateTags= tag=>{
        let index = state.value.tags.findIndex(item=>item.name===tag.name)
        state.value.tags.splice(index,1)
        //從index開始刪一個
    }

    const updateMenuList = val =>{
        state.value.menuList=val
    }

    const addMenu = (router,type)=>{
        //刪除舊的子路由，重置路由為最基本的main和login，處理多帳號路由問題(高權限留下來的路由被低權限帳號使用)
        resetRouter(router)

        //應對使用者刷新頁面
        if(type==='refresh'){
            if(JSON.parse(localStorage.getItem('store'))){
                state.value=JSON.parse(localStorage.getItem('store'))
            }else{
                return
            }
        }

        //計算新的權限子路由
        const menu = state.value.menuList;
        const module = import.meta.glob('../views/**/*.vue')
        //重要，將組件統整成一個對象，屬性名為'../views/xxx.vue'，值為懶加載的函數()=>import('../views/xxx.vue')
        const routeArr = [];
        menu.forEach(item=>{
            if(item.children){
                //有children的讀取children而非自己，如：其他
                item.children.forEach(val=>{
                    let url = `../views/${val.url}.vue`;
                    //val.url是對應vue檔的名字
                    val.component = module[url];
                    //給該路由路徑加上對應的懶加載，即()=>import('路徑')
                    routeArr.push(...item.children)
                })
            }else{
                let url = `../views/${item.url}.vue`
                item.component = module[url]
                routeArr.push(item)
            }
        })
        
        //把新得到的權限子路由添加上去
        routeArr.forEach(item=>{
            router.addRoute('main',item)
            
        })

        //新路由加上去之後要自行跳過去，否則不會自己跳
        if(type==='refresh'){
            router.push('home')
            //如果刷新
        }

    }

    const clean = router=>{
        state.value = initState()
        //使用組合式寫法的時候，無法使用$reset重置
        resetRouter(router)
        localStorage.removeItem('store')
    }

    return {
        //用上的數據與方法都需要return
        state,isCollapse2,selectMenu,updateTags,updateMenuList,addMenu,clean
    }
})