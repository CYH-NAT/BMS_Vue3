import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //這個是添加的別名
  resolve:{
    alias:[
      {
        find:'@',
        replacement:'/src'
      }
    ]
  }
})
