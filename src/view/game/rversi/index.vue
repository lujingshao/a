<template>
  <div class="rversi">
    <!-- <div class="liser">
      <li>黑棋: {{ blackChess }}</li>
      <li>白棋: {{ whiteChess }}</li>
    </div> -->
    <div class="reverder" v-for="(item, index) in data" :key="index">
      <div class="rversv" v-for="(v,i) in item" :key="i" @click="reversiFn(index, i)">
        <div :class="[v===true?'black-chess':v===false?'white-chess':'']"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rversi",
  data() {
    return {
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, true, false, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, false, true, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      flag: true, //黑棋先行
      blackChess: 2,
      whiteChess: 2,
    };
  },
  methods: {
    reversiFn(item ,v){
      let data = JSON.parse(JSON.stringify(this.data));
      // 判断 当前位 是否有棋子
      if (data[item][v] !== 0) {
        this.$message.error("当前位置有棋子");
        return;
      }

      data[item][v] = this.flag;
      this.flag = !this.flag;
      this.data = data;

      this.colFn(item, v);

      // 这是 是否符合规则
    },
    // col
    colFn(item ,v){
      let data = JSON.parse(JSON.stringify(this.data))[item];
      console.log(data , v);
    }
  },
};
</script>
<style lang="scss" scoped>
.rversi {
  width: 600px;
  height: 600px;
  margin: auto;
}
.reverder {
  width: 100%;
  height: 50px;
}
.rversv {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid black;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.white-chess {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(15px 15px at 15px 15px, #fff, #e2e2e2);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.black-chess {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(10px 10px at 15px 15px, #fff, #333);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}
</style>