<template>
  <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>
<script>
export default {
  name: "echars",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      let option = {
        visualMap: {
          min: 0,
          max: 10000,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: false,
          orient: "horizontal",
          inRange: {
            color: ["#e0ffff", "#006edd"],
            symbolSize: [30, 100],
          },
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none",
          },
        },
        series: [
          {
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
              },
            },
            name:'核废料坑',
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: [
              {
                name: "南海诸岛",
                value: 0,
              },
              {
                name: "北京",
                value: 54,
              },
              {
                name: "天津",
                value: 13,
              },
              {
                name: "上海",
                value: 40,
              },
              {
                name: "重庆",
                value: 75,
              },
              {
                name: "河北",
                value: 13,
              },
              {
                name: "河南",
                value: 83,
              },
              {
                name: "云南",
                value: 11,
              },
              {
                name: "辽宁",
                value: 19,
              },
              {
                name: "黑龙江",
                value: 15,
              },
              {
                name: "湖南",
                value: 69,
              },
              {
                name: "安徽",
                value: 60,
              },
              {
                name: "山东",
                value: 39,
              },
              {
                name: "新疆",
                value: 4,
              },
              {
                name: "江苏",
                value: 31,
              },
              {
                name: "浙江",
                value: 104,
              },
              {
                name: "江西",
                value: 36,
              },
              {
                name: "湖北",
                value: 1052,
              },
              {
                name: "广西",
                value: 33,
              },
              {
                name: "甘肃",
                value: 7,
              },
              {
                name: "山西",
                value: 9,
              },
              {
                name: "内蒙古",
                value: 7,
              },
              {
                name: "陕西",
                value: 22,
              },
              {
                name: "吉林",
                value: 4,
              },
              {
                name: "福建",
                value: 18,
              },
              {
                name: "贵州",
                value: 5,
              },
              {
                name: "广东",
                value: 98,
              },
              {
                name: "青海",
                value: 1,
              },
              {
                name: "西藏",
                value: 0,
              },
              {
                name: "四川",
                value: 44,
              },
              {
                name: "宁夏",
                value: 4,
              },
              {
                name: "海南",
                value: 22,
              },
              {
                name: "台湾",
                value: 3,
              },
              {
                name: "香港",
                value: 5,
              },
              {
                name: "澳门",
                value: 5,
              },
            ],
          },
        ],
      };
      var count = 0;
      var timeTicket = null;
      var dataLength = option.series[0].data.length;
      timeTicket && clearInterval(timeTicket);
      timeTicket = setInterval(function () {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: count % dataLength,
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: count % dataLength,
        });
        count++;
      }, 1000);

      myChart.setOption(option);

      //移入
      myChart.on("mouseover", function (params) {
        clearInterval(timeTicket);
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      });
      //移出
      myChart.on("mouseout", function () {
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function () {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
          });
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: count % dataLength,
          });
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: count % dataLength,
          });
          count++;
        }, 1000);
      });
    },
    randomData() {
      return Math.round(Math.random() * 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>