//解析運行環境
const env =import.meta.env.MODE || 'prod'
const EnvConfig= {
    //根據環境決定對應的baseApi和mockApi
    development:{
        baseApi:'/api',
        mockApi:'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    test:{
        baseApi:'//test.future.com/api',
        mockApi:'https://apifoxmock.com/m1/4068509-0-default/api',
    },
    pord:{
        baseApi:'//future.com/api',
        mockApi:'https://apifoxmock.com/m1/4068509-0-default/api',
    },
}

export default{
    env,
    ...EnvConfig[env],
    //預設mock的是否使用的開關
    mock:false
}