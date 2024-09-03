//本機mock攔截後回傳的假資料
export default {
    getTableData: () => {
      return {
        code: 200,
        data: {
          tableData: [
            {
              name: "oppo",
              todayBuy: 500,
              monthBuy: 3500,
              totalBuy: 22000,
            },
            {
              name: "vivo",
              todayBuy: 300,
              monthBuy: 2200,
              totalBuy: 24000,
            },
            {
              name: "蘋果",
              todayBuy: 800,
              monthBuy: 4500,
              totalBuy: 65000,
            },
            {
              name: "小米",
              todayBuy: 1200,
              monthBuy: 6500,
              totalBuy: 45000,
            },
            {
              name: "三星",
              todayBuy: 300,
              monthBuy: 2000,
              totalBuy: 34000,
            },
            {
              name: "魅族",
              todayBuy: 350,
              monthBuy: 3000,
              totalBuy: 22000,
            },
          ],
        },
      }
    },
    getCountData: () => {
      return {
        code: 200,
        data: [
          {
            name: "今日支付訂單",
            value: 1234,
            icon: "SuccessFilled",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏訂單",
            value: 210,
            icon: "StarFilled",
            color: "#ffb980",
          },
          {
            name: "今日未支付訂單",
            value: 1234,
            icon: "GoodsFilled",
            color: "#5ab1ef",
          },
          {
            name: "本月支付訂單",
            value: 1234,
            icon: "SuccessFilled",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏訂單",
            value: 210,
            icon: "StarFilled",
            color: "#ffb980",
          },
          {
            name: "本月未支付訂單",
            value: 1234,
            icon: "GoodsFilled",
            color: "#5ab1ef",
          },
        ],
      };
    },
    getChartData: () => {
      return {
        code: 200,
        data: {
          orderData: {
            date: [
              "2019-10-01",
              "2019-10-02",
              "2019-10-03",
              "2019-10-04",
              "2019-10-05",
              "2019-10-06",
              "2019-10-07",
            ],
            data: [
              {
                蘋果: 3839,
                小米: 1423,
                華為: 4965,
                oppo: 3334,
                vivo: 2820,
                一加: 4751,
              },
              {
                蘋果: 3560,
                小米: 2099,
                華為: 3192,
                oppo: 4210,
                vivo: 1283,
                一加: 1613,
              },
              {
                蘋果: 1864,
                小米: 4598,
                華為: 4202,
                oppo: 4377,
                vivo: 4123,
                一加: 4750,
              },
              {
                蘋果: 2634,
                小米: 1458,
                華為: 4155,
                oppo: 2847,
                vivo: 2551,
                一加: 1733,
              },
              {
                蘋果: 3622,
                小米: 3990,
                華為: 2860,
                oppo: 3870,
                vivo: 1852,
                一加: 1712,
              },
              {
                蘋果: 2004,
                小米: 1864,
                華為: 1395,
                oppo: 1315,
                vivo: 4051,
                一加: 2293,
              },
              {
                蘋果: 3797,
                小米: 3936,
                華為: 3642,
                oppo: 4408,
                vivo: 3374,
                一加: 3874,
              },
            ],
          },
          videoData: [
            { name: "小米", value: 2999 },
            { name: "蘋果", value: 5999 },
            { name: "vivo", value: 1500 },
            { name: "oppo", value: 1999 },
            { name: "魅族", value: 2200 },
            { name: "三星", value: 4500 },
          ],
          userData: [
            { date: "週一", new: 5, active: 200 },
            { date: "週二", new: 10, active: 500 },
            { date: "週三", new: 12, active: 550 },
            { date: "週四", new: 60, active: 800 },
            { date: "週五", new: 65, active: 550 },
            { date: "週六", new: 53, active: 770 },
            { date: "週日", new: 33, active: 170 },
          ],
        },
      };
    }
  }
  