<template>
    <div class="main">
        <el-row class="home" :gutter="20">
            <el-col :span="8" style="margin-top:20px">
                <el-card shadow="hover">
                    <div class="user">
                        <img :src="getImageUrl('user')" class="user">
                        <div class="user-info">
                            <p class="user-info-admin" @click="">admin</p>
                            <p class="user-info-p">超級管理員</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登入錄間：<span>2024-06-30</span></p>
                        <p>上次登入位置：<span>臺中市</span></p>
                    </div>
                </el-card>
                <el-card shadow="hover" class="user-table">
                    <el-table :data="tableData">
                        <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="margin-top:20px">
                <div class="num">
                    <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                        <component :is="item.icon" class="icons" :style="{ background: item.color }" />
                        <div class="detail">
                            <p class="num">{{ item.value }}</p>
                            <p class="txt">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card class="top-echart">
                    <div ref="echart" style="height: 280px;"></div>
                </el-card>
                <div class="graph">
                    <el-card>
                        <div ref="userEchart" style="height: 240px;"></div>
                    </el-card>
                    <el-card>
                        <div ref="videoEchart" style="height: 240px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'
//只能叫做echarts

const { proxy } = getCurrentInstance()

const getImageUrl = user => new URL(`../assets/images/${user}.png`, import.meta.url).href
//將當前頁面的絕對路徑和圖片路徑進行拚接

const ImgUrl = import(`../assets/images/user.png`)

const tableData = ref([
    {
        name: "Java",
        todayBuy: 100,
        monthBuy: 200,
        totalBuy: 300,
    },
    {
        name: "Python",
        todayBuy: 100,
        monthBuy: 200,
        totalBuy: 300,
    }
])

const tableLabel = ref({
    name: "課程",
    todayBuy: "今日購買",
    monthBuy: "本月購買",
    totalBuy: "總購買",
})

const countData = ref([])

const echart = ref(null)

const observer = ref(null)

const loadData = async () => {  //因為函數裡有東西要await，所以是異步的
    //把data裡面的code以及data裡面再data裡的tableData重命名為dt解構出來
    const { data: { code, data: { tableData: dt } } } = await axios({
        url: '/api/home/getTableData',
        method: 'get'
    })

    if (code === 200) {
        tableData.value = dt
        //console.log(code,data.tableData)
    }
}

//折線圖和柱狀圖的配置
const xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
})

const pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    legend: {},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: []
})

const getTableData = async () => {
    const data = await proxy.$api.getTableData()
    tableData.value = data.tableData
}

const getCountData = async () => {
    const data = await proxy.$api.getCountData()
    //console.log(data)
    countData.value = data
}

const getChartData = async () => {
    const { orderData, userData, videoData } = await proxy.$api.getChartData()
    //對第一個圖表進行x和series賦值
    xOptions.xAxis.data = orderData.date;

    xOptions.series = Object.keys(orderData.data[0]).map(val => ({
        name: val,  //ex:蘋果
        data: orderData.data.map(item => item[val]),  //ex:蘋果每天的銷售量
        type: 'line'
    }))
    //val是商品名，data是數組，包含多個對象，每個對象為每天各手機的銷售數據，所以要取出特定項的銷售數據

    const oneEchart = echarts.init(proxy.$refs['echart'])
    //const oneEchart = echarts.init(echart.value)   //在想要得到dom的節點加上ref="名字"，用同個名字宣告成變量=ref(null)，並使用變量名.value得到DOM
    oneEchart.setOption(xOptions)

    //對第二個表格進行渲染

    xOptions.xAxis.data = userData.map(i => i.date);
    xOptions.series = [
        {
            name: '新增用戶',
            data: userData.map(i => i.new),
            type: 'bar'
        },
        {
            name: '活躍用戶',
            data: userData.map(i => i.active),
            type: 'bar'
        },
    ]

    const twoEchart = echarts.init(proxy.$refs['userEchart'])
    twoEchart.setOption(xOptions)

    //對餅狀圖渲染
    pieOptions.series = [
        {
            data: videoData,
            type: 'pie'
        }
    ]

    const threeEchart = echarts.init(proxy.$refs['videoEchart'])
    threeEchart.setOption(pieOptions)

    //監聽頁面的變化
    //如果監聽的容器大小發生變化，會執行回調函數
    observer.value = new ResizeObserver((en) => {
        oneEchart.resize()
        twoEchart.resize()
        threeEchart.resize()
    })

    //容器存在
    if (proxy.$refs["echart"]) {
        observer.value.observe(proxy.$refs['echart'])
        //監聽容器的變化
    }
}

onMounted(() => {
    getTableData()
    getCountData()
    getChartData()
})
//loadData()


// axios({
//     url:'/api/home/getTableData',
//     method:'get'
// }).then(res=>console.log(res))
</script>

<style lang="less" scoped>
.main{
    height:843px;
    overflow:scroll;
    //讓父容器比較子容器小，且設置滾輪時無法完全顯示的部份會變成滾輪
}
.main::-webkit-scrollbar {
  display: none;
  //隱藏整條滾動條
}
.home {
    height: 943px;
    //overflow: scroll;

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        .user-info {
            p {
                line-height: 40px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 35px;
            }
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }

            //把span包在p裡面可以確保他們在同一行上顯示
        }
    }

    .user-table {
        margin-top: 20px;
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;

        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-flow: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 15px;
                text-align: center;
                color: #999;
            }
        }

    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%; //給50%的話分不出來
            height: 260px;
        }
    }
}
</style>