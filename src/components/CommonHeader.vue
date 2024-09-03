<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu"></component>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current" :to="current.path">{{current.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>個人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'
import { useAllDataStore } from '../stores';
import { useRouter } from 'vue-router';

const router=useRouter()
const store = useAllDataStore()

const getImageUrl= (user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
    //import.meta.url是得到當前文件的絕對路徑
    //new URL(url,baseurl)是計算當前路徑的絕對URL
}

const handleCollapse = ()=>{
    //store().state.isCollapse=!store().state.isCollapse
    store.isCollapse2=!store.isCollapse2  //雖然是REF響應式數據，PINIA外部使用的時候可以直接用他的值，而不用去點value
}

const handleLogOut = ()=>{
    store.clean(router)
    router.push('/login')
}

const current = computed( ()=>store.state.currentMenu)

</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #333;

}
.icons{
    width: 20px;
    height: 20px;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }

}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
// 修改麵包屑的樣式，改成白色並且改變遊標，做樹式穿透
:deep(.bread span){
    color:#fff !important;
    cursor:pointer !important
}
</style>