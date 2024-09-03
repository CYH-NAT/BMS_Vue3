//整個項目api的統一管理

import request from "./request";

//請求首頁左側表格的數據

export default{
    getTableData(){
        return request({
            //本機mock開啟時要用以下的地址
            url:'/home/getTableData',

            //以下為使用線上mock的地址，目的在於模擬真實對接，但數據還是假的，測試時記得要把本機mock關掉
            //url:'/home/getTable',

            method:'get',

            mock:false
            //是否使用線上mock的基址
        })
    },
    getCountData(){
        return request({
            url:'/home/getCountData',
            method:'get',
        })
    },
    getChartData() {
        return request({
          url: '/home/getChartData',
          method: 'get',
        })
    },
    getUserData(data) {
      return request({
        url: '/user/getUserData',
        method: 'get',
        data,
      })
    },
    deleteUser(data) {
      return request({
        url: '/user/deleteUserData',
        method: 'get',
        data,
      })
    },
    addUser(data) {
      return request({
        url: '/user/addUserData',
        method: 'post',
        data,
      })
    },
    editUser(data) {
      return request({
        url: '/user/editUser',
        method: 'post',
        data,
      })
    },
    getMenu(params){
      return request({
        url: '/permission/getMenu',
        method: 'post',
        data:params,
      })
    }

}