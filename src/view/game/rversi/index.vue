<template>
  <div class="rversi">
    <div class="liser">
      <li>黑棋: {{ blackChess }}</li>
      <li>白棋: {{ whiteChess }}</li>
    </div>
    <div class="reverder" v-for="(item, index) in data" :key="index">
      <div class="rversv" v-for="(v,i) in item" :key="i" @click="reversiFn(v)">
        <div :class="[v[2].clrFn==1?'black-chess':v[2].clrFn==2?'white-chess':'']"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rversi",
  data() {
    return {
      data: [],
      flag: 1, //黑棋先行
      blackChess: 2,
      whiteChess: 2,
    };
  },
  created() {
    let datas = [];
    for (let i = 0; i < 12; i++) {
      let data = [];
      for (let j = 0; j < 26; j++) {
        if ((i == 5 && j == 12) || (i == 6 && j == 11)) {
          data.push([i, j, { clrFn: 1 }]);
        } else if ((i == 6 && j == 12) || (i == 5 && j == 11)) {
          data.push([i, j, { clrFn: 2 }]);
        } else {
          data.push([i, j, { clrFn: 0 }]);
        }
      }
      datas.push(data);
    }
    this.data = datas;
  },
  methods: {
    //点击落子
    reversiFn(now) {
      if (now[2].clrFn !== 0) {
        this.$message.error("已经点击过了");
        return;
      }
      if (!this.judgeFn(now)) {
        this.$message.error("这里不可以落子");
        return;
      }
      now[2].clrFn = this.flag;
      this.blackChess = 0;
      this.whiteChess = 0;
      this.data.forEach((item) => {
        item.forEach((v) => {
          if (v[2].clrFn == 1) {
            this.blackChess++;
          }
          if (v[2].clrFn == 2) {
            this.whiteChess++;
          }
        });
      });
      if (this.flag === 1) {
        this.flag = 2;
      } else {
        this.flag = 1;
      }
    },
    judgeFn([col, row]) {
      //     横   纵   棋子
      let data = this.data;
      // 获取 横的数组
      let colData = data[col];
      // 获取 纵的数组
      let rowData = data.map((item) => {
        return item[row];
      });
      // 判断横 是否存在
      let cols = this.colDataFn(colData, row, this.flag);
      // 判断纵 是否存在
      let rows = this.rowDataFn(rowData, col, this.flag);
      if (!cols && !rows) {
        return 0;
      }
      return 1;
    },

    //操控横
    colDataFn(data, row, nav) {
      console.log(data, row, nav)
      let aIndex = null,
        bIndex = null;
      data.forEach((item, index) => {
        if (item[1] < row && item[2].clrFn == nav) {
          aIndex = index;
        }
        if (item[1] > row && item[2].clrFn == nav) {
          bIndex = index;
        }
      });
      if (aIndex == null && bIndex == null) {
        return 0;
      }
      aIndex == null ? false : this.changeFn(data, row, aIndex);
      bIndex == null ? false : this.changeFn(data, row, bIndex);

      return 1;
    },
    //操控纵
    rowDataFn(data, col, nav) {
      let aIndex = null,
        bIndex = null;
      data.forEach((item, index) => {
        if (item[0] < col && item[2].clrFn == nav) {
          aIndex = index;
        }
        if (item[0] > col && item[2].clrFn == nav) {
          bIndex = index;
        }
      });
      if (aIndex == null && bIndex == null) {
        return false;
      }
      aIndex == null ? "" : this.changeFn(data, col, aIndex);
      bIndex == null ? "" : this.changeFn(data, col, bIndex);
      return true;
    },
    changeFn(data, row, num) {
      for (
        let i = (row > num ? num : row) + 1;
        i < (row > num ? row : num);
        i++
      ) {
        data[i][2].clrFn = this.flag;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rversi {
  width: 1300px;
  height: 600px;
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
  > p {
    width: 40px;
    line-height: 40px;
    border-radius: 50%;
    text-align: center;
  }
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
.liser {
  width: 200px;
  height: 60px;
  position: fixed;
  top: 0px;
  left: 50%;
  margin-left: -100px;
  display: flex;
  > li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>