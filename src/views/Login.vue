<template>
    <div class="body-login">
        <el-form :modle='loginForm' class="login-container">
            <h1>歡迎登入</h1>
            <el-form-item>
                <el-input type="input" placeholder="請輸入帳號" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="請輸入密碼" v-model="loginForm.password" @keyup.enter="handleLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive,onMounted,onUnmounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { useAllDataStore } from '../stores';
import { useRouter } from 'vue-router';

const {proxy}=getCurrentInstance()
const store=useAllDataStore()
const router=useRouter()

const loginForm=reactive({
    username:'',
    password:''
})

const enter_up = e =>{
                if (e.keyCode == 13 || e.keyCode == 100) {
                    handleLogin()
                }
            }

const handleLogin= async()=>{
    //向後端請求菜單
    const res = await proxy.$api.getMenu(loginForm)
    //console.log(res)
    
    store.updateMenuList(res.menuList)
    //更新左側菜單
    store.state.token = res.token
    //得到token
    store.addMenu(router)
    //對路由表進行更新，加入對應權限的子路由
    router.push('/')
    //先加載路由表再跳轉，不然會有bug。沒有token的話會自動跳回登入頁
}

onMounted(()=>{
    window.addEventListener('keydown', enter_up)
})

onUnmounted(()=>{
    window.removeEventListener('keydown', enter_up, false)
})

</script>

<style lang="less" scoped>
.body-login{
    width: 100%;
    height: 100vh;
    background-image: url('../assets/images/background.png');
    background-size: 100%;
    overflow: hidden;
}
.login-container{
    width: 400px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin:250px auto;
    h1{
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }
    :deep(.el-form-item__content){
        justify-content: center;
        //對按鈕進行樣式穿刺
    }
}
</style>