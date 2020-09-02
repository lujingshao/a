<template>
  <div class="echart" ref="echart"></div>
</template>
<script>
export default {
  name: 'echart',
  props: ["option"],
  data(){
    return {

    }
  },
  mounted(){
    let myChart = this.$echarts.init(this.$refs.echart);
    myChart.setOption(this.option);
  }
}
</script>
<style lang="scss" scoped>
  .echart{
    width: 100%;
    height: 100%;
  }
</style>