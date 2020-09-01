<template>
  <div class="gobang">
    <div class="list" v-for="(item, index) in gobangData" :key="index">
      <div class="verts" v-for="(v, i) in item" :key="i" @click="dropFn(index,i)">
        <div :class="[v===true?'black-chess':v===false?'white-chess':'']"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gobang",
  data() {
    return {
      gobangData: [
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
      flag: true, //黑棋 先行
    };
  },
  created() {
    this.a = JSON.parse(JSON.stringify(this.gobangData));
  },
  methods: {
    dropFn(item, v) {
      let gobang = JSON.parse(JSON.stringify(this.gobangData));
      // 判断 当前位 是否有棋子
      if (gobang[item][v] !== 0) {
        this.$message.error("当前位置有棋子");
        return;
      }
      gobang[item][v] = this.flag; // 落子
      this.gobangData = gobang; // 赋值 刷新 视图
      this.flag = !this.flag; //换执棋手
      // 判断行 够不够 五个
      let col = this.spliceFn(item, v, "col");
      col = this.judgFvendFn(col);
      let row = this.spliceFn(v, item, "row");
      row = this.judgFvendFn(row);
      let obliq = this.oblique(item, v);
      obliq = this.judgFvendFn(obliq);
      let obrows = this.obrows(item, v);
      obrows = this.judgFvendFn(obrows);
      if (col || row || obliq || obrows) {
        this.open();
      }
    },

    spliceFn(item, v, bool) {
      let gobang = JSON.parse(JSON.stringify(this.gobangData));
      let arr = [];
      for (
        let i = v - 4 > 0 ? v - 4 : 0;
        i < (v + 4 > 11 ? 11 : v + 4) + 1;
        i++
      ) {
        if (bool === "col") {
          arr.push(gobang[item][i]);
        } else {
          arr.push(gobang[i][item]);
        }
      }
      return arr;
    },
    //左倾斜
    oblique(item, v) {
      let gobang = JSON.parse(JSON.stringify(this.gobangData));
      let arr = [];
      for (
        let i = item - 4, j = v - 4;
        i < item + 4 + 1 && j < v + 4 + 1;
        i++, j++
      ) {
        if (i < 0 || j < 0 || i > 11 || j > 11) continue;
        arr.push(gobang[i][j]);
      }
      return arr;
    },
    //右倾斜
    obrows(item, v) {
      let gobang = JSON.parse(JSON.stringify(this.gobangData));
      let arr = [];
      for (
        let i = item + 4, j = v - 4;
        i > item - 5 && j < v + 4 + 1;
        i--, j++
      ) {
        if (i < 0 || j < 0 || i > 11 || j > 11) continue;
        arr.push(gobang[i][j]);
      }
      return arr;
    },
    // 调用判断 他是否存在着
    judgFvendFn(data) {
      let flag = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] === !this.flag) {
          flag++;
        } else {
          flag = 0;
        }
        if (flag === 5) {
          return true;
        }
      }
      return false;
    },
    //胜利
    open() {
      this.$confirm(
        "是否重新打开新的一局",
        (this.flag ? "白棋" : "黑棋") + "胜利",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.gobangData = JSON.parse(JSON.stringify(this.a));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.gobang {
  height: 100%;
  width: 100%;
}
.list {
  width: 600px;
  margin: 0 auto;
}
.verts {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid gray;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.white-chess {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(10px 10px at 15px 15px, #fff, #e2e2e2);
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