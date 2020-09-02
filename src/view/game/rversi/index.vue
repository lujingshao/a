<template>
  <div class="rversi">
    <!-- <div class="liser">
      <li>黑棋: {{ blackChess }}</li>
      <li>白棋: {{ whiteChess }}</li>
    </div>-->
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
    reversiFn(item, v) {
      let data = JSON.parse(JSON.stringify(this.data));
      // 判断 当前位 是否有棋子
      if (data[item][v] !== 0) {
        this.$message.error("当前位置有棋子");
        return;
      }

      // data[item][v] = this.flag;
      // this.data = data;

      //横向显示
      let col = this.colFn(item, v, "col");
      col[0] = col[0] !== -1 ? this.avveFn(col[0], col[2], v) : false;
      col[1] = col[1] !== -1 ? this.avveFn(col[1], col[2], v) : false;
      //纵向显示
      let row = this.colFn(item, v, "row");
      row[0] = row[0] !== -1 ? this.avveFn(row[0], row[2], item) : false;
      row[1] = row[1] !== -1 ? this.avveFn(row[1], row[2], item) : false;
      console.log(col, row);

      //判断它是否 紧挨着 其他棋子
      
      // 这是 是否符合规则
      if (col[0] || col[1] || row[0] || row[1]) {
        data[item][v] = this.flag;
        this.data = data;
        this.flag = !this.flag;
      } else {
        this.$message.error("这样不符合规则")
      }
    },
    // col row
    colFn(item, v, bool) {
      let data = JSON.parse(JSON.stringify(this.data));
      let a = -1;
      let b = -1;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (bool === "col") {
          if (i < v && data[item][i] === this.flag && a === -1) {
            a = i;
          } else if (i > v && data[item][i] === this.flag) {
            b = i;
          }
          arr.push(data[item][i]);
        } else if (bool === "row") {
          if (i < item && data[i][v] === this.flag && a === -1) {
            a = i;
          } else if (i > item && data[i][v] === this.flag) {
            b = i;
          }
          arr.push(data[i][v]);
        }
      }
      return [a, b, arr];
    },
    //倾斜 -> 暂时取消

    avveFn(col, arr, v) {
      let data = JSON.parse(JSON.stringify(arr));
      let datArr = data.slice(col < v ? col : v, (col > v ? col : v) + 1);
      let bool = datArr.some((item) => {
        return item === !this.flag;
      });
      return bool;
    },
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