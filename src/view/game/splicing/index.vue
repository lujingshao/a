<template>
  <el-row class="splicing" :gutter="20">
    <el-col :span="12">
      <mytable></mytable>
    </el-col>
    <el-col :span="12">
      <myechart :option="option1"></myechart>
    </el-col>
    <el-col :span="12">
      <myechart :option="option2"></myechart>
    </el-col>
    <el-col :span="12">
      <myechart :option="option3"></myechart>
    </el-col>
  </el-row>
</template>
<script>
import myechart from "@/components/echars.vue";
import mytable from '@/components/Tables.vue'
export default {
  name: "splicing",
  components: {
    myechart,
    mytable
  },
  data() {
    return {
      option1: {
        title: {
          left: "center",
          text: "折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      option2: {
        title: {
          left: "center",
          text: "柱形图",
        },
        color: ["#3398DB", "red", "blue", "pink", "black"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "bar",
            barWidth: "15%",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            barWidth: "15%",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            barWidth: "15%",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "bar",
            barWidth: "15%",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      option3: {
        title: {
          text: "饼图",
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "邮件营销",
            type: "pie",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "pie",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "pie",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "pie",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "pie",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.splicing {
  height: 100%;
  > div {
    height: 312px;
    box-sizing: border-box;
    border: 1px solid red;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  >div::-webkit-scrollbar{
    display: none;
  }
}
</style>