import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import menuApi from './mockData/permisson'
//1攔截的路徑2方法3製造出的假數據

Mock.mock(/api\/home\/getTableData/,'get',homeApi.getTableData);

//第三個假數據是一個調用之後會回傳一個對象的方法
//寫好mock之後一定要在全局引入，否則不會生效

//mock裡面寫成正則表達式的話會變成局部匹配


Mock.mock(/api\/home\/getCountData/,'get',homeApi.getCountData);

Mock.mock(/api\/home\/getChartData/,'get',homeApi.getChartData);

Mock.mock(/api\/user\/getUserData/,'get',userApi.getUserList);

Mock.mock(/api\/user\/deleteUserData/,'get',userApi.deleteUser);

Mock.mock(/api\/user\/addUserData/,'post',userApi.createUser);

Mock.mock(/api\/user\/editUser/,'post',userApi.updateUser);

Mock.mock(/api\/permission\/getMenu/,'post',menuApi.getMenu);
