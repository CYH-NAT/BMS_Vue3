<template>
    <div class="common-layout">
        <el-container class="lay-containter">
            <!-- 自定義左側組件 -->
             <common-aside/>
             <el-container>
                <el-header class="el-header">
                    <common-header/>
                </el-header>
                <common-tab></common-tab>
                <el-main class="righ-main">
                    <router-view></router-view>
                </el-main>
             </el-container>
        </el-container>
    </div>
</template>

<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTab from '@/components/CommonTab.vue';
</script>

<style lang="less" scoped>
    .common-layout,.lay-container{
        height: 100%;
    }
    .el-header{
        background-color: #333;
    }

</style>