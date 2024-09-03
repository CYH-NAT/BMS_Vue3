import axios from "axios";
import { ElMessage } from "element-plus";
//引入預設的config
import config from "@/config";

//自定義axios
const service =axios.create({
    baseURL:config.baseApi
});
const NETWORK_ERROR='網路錯誤...'


//加上響應攔截器
service.interceptors.response.use(
    (res)=>{
        const {code,data,msg} =res.data  //res.data是後端傳來的所有數據
        //console.log(res.data)
        if(code===200){
            return data
        }else{
            ElMessage.error(msg||NETWORK_ERROR)
            //prmoise要拋出錯誤
            return Promise.reject(msg||NETWORK_ERROR)
        }
    }
)

//加上請求攔截器
// service.interceptors.request.use(
//     (res)=>{
//         const {code,data,msg} =res.data
//         if(code===200){
//             return data
//         }else{
//             ElMessage.error(msg||NETWORK_ERROR)
//             //prmoise要拋出錯誤
//             return Promise.reject(msg||NETWORK_ERROR)
//         }
//     }
// )

function request(options){
    //如果不指定，預設為get請求
    options.method=options.method || 'get';


    // 關於get請求參數的調整
    if(options.method.toLowerCase()==='get'){
        options.params = options.data
    }


    //由config得知預設的mock的是否使用，config預設為false即不使用
    let isMock = config.mock;


    //讓使用者透過調用api時的傳參來決定要不要另外決定是否使用mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }

    //對環境進行判斷，並依照是否用mock來決定此次調用axios時baseURL的值
    if(config.env === 'prod'){
        //實際進行生產環境時不能用mock
        service.defaults.baseURL = config.baseApi
    }else{
        //測試或開發環境下，讓使用者自行決定能不能用mock
        service.defaults.baseURL = isMock? config.mockApi : config.baseApi
    }
    
    return service(options)
    //依照option創造axios實例
}

export default request;