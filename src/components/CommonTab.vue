<template>
    <div class="tags">
        <el-tag
            v-for="(tag,index) in tags"
            :key='tag.name'
            :closable="tag.name!=='home'"
            :effect="route.name===tag.name?'dark':'plain'"
            @click="handleMenu(tag)"
            @close="handleClose(tag,index)"
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import { useAllDataStore } from '../stores';

const store = useAllDataStore()
const tags = computed(()=>store.state.tags)
const route=useRoute()
const router=useRouter()
const handleMenu = (tag)=>{
    router.push(tag.name)
    store.selectMenu(tag)
}
const handleClose = (tag,index)=>{
    //通過pinia管理的
    store.updateTags(tag)
    //把被點到的tags關掉，從tags列當中移除選中項，更新pinia中的tag

    if(tag.name !== route.name){return}
    //被點到的不是目前頁面的話，不進行跳轉

    if(index === store.state.tags.length){
        //因為上面已經update，所以tags的length減少1，所以這邊不用再給length-1
        //如果是當前的頁面，而且是tags的最後一項，就跳到左邊的tag
        store.selectMenu(tags.value[index-1])
        router.push(tags.value[index-1].name)
    }else{
        //如果是當前的頁面，而且不是tags的最後一項，就跳到右邊的tag(原本是index+1的那一項因為數組減少了變成了index)
        store.selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }
}

</script>

<style lang="less" scoped>
.tags{
    margin:20px 0 0 20px
}
.el-tag{
    margin-right: 10px;
}
</style>