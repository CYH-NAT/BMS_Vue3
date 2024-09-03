<template>
    <div>
        <el-empty>
            <el-button type="primary" to="/" @click="jump">回首頁</el-button>
            <!-- router-link標籤才有回首頁的功能 -->
        </el-empty>
    </div>
</template>

<script setup>

import {ref} from 'vue'
import { useRouter,onBeforeRouteLeave,onBeforeRouteUpdate } from 'vue-router';

const router=useRouter()
const fromPage = ref(null)

onBeforeRouteLeave((to,from)=>{
    console.log(from)
    return true
})

onBeforeRouteUpdate((to,from)=>{
    console.log(from)
    return true
})

const jump = ()=>router.push({path:'/',replace:true})

</script>

<style lang="less" scoped></style>