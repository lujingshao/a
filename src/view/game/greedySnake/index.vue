<template>
  <div class="map">
    <canvas id="canvas" height="600" width="870"></canvas>
  </div>
</template>
<script>
export default {
  name: "greedySnake",
  data() {
    return {
      snake: [], //定义一条蛇，画蛇的身体
      snakeCount: 6, //初始化蛇的长度
      foodx: 0,
      foody: 0,
      togo: 0,
      c: null,
      ctx: null,
    };
  },
  mounted() {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    let _this = this;
    document.onkeydown = function (e) {
      _this.keydown(e);
    };
    //调用函数
    window.onload = function () {
      _this.start();
      setInterval(_this.move, 150);
      _this.drawtable();
    };
  },
  methods: {
    drawtable() {
      //画地图的函数
      //画竖线
      for (let i = 0; i < 60; i++) {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(15 * i, 0);
        this.ctx.lineTo(15 * i, 600);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      //画横线
      for (var j = 0; j < 40; j++) {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 15 * j);
        this.ctx.lineTo(870, 15 * j);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      //画蛇的身体
      for (var k = 0; k < this.snakeCount; k++) {
        this.ctx.fillStyle = "#000";
        if (k == this.snakeCount - 1) {
          this.ctx.fillStyle = "red"; //蛇头的颜色与身体区分开
        }
        this.ctx.fillRect(this.snake[k].x, this.snake[k].y, 15, 15); //前两个数是矩形的起始坐标，后两个数是矩形的长宽。
      }
      //绘制食物
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.foodx, this.foody, 15, 15);
      this.ctx.fill();
    },
    start() {
      //定义蛇的坐标
      //var snake =[];//定义一条蛇，画蛇的身体
      //var snakeCount = 6;//初始化蛇的长度
      for (var k = 0; k < this.snakeCount; k++) {
        this.snake[k] = { x: k * 15, y: 0 };
      }
      this.drawtable();
      this.addfood(); //在start中调用添加食物函数
    },
    isEat() {
      //吃到食物后长度加1
      if (
        this.snake[this.snakeCount - 1].x == this.foodx &&
        this.snake[this.snakeCount - 1].y == this.foody
      ) {
        this.addfood();
        this.snakeCount++;
        this.snake.unshift({ x: -15, y: -15 });
      }
    },
    isDead() {
      if (
        this.snake[this.snakeCount - 1].x > 885 ||
        this.snake[this.snakeCount - 1].y > 585 ||
        this.snake[this.snakeCount - 1].x < 0 ||
        this.snake[this.snakeCount - 1].y < 0
      ) {
        this.$router.push("/home/tables");
      }
    },
    keydown(e) {
      switch (e.keyCode) {
        case 37:
          this.togo = 1;
          break;
        case 38:
          this.togo = 2;
          break;
        case 39:
          this.togo = 3;
          break;
        case 40:
          this.togo = 4;
          break;
        case 65:
          this.togo = 5;
          break;
        case 68:
          this.togo = 6;
          break;
      }
    },
    move() {
      switch (this.togo) {
        case 1:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x - 15,
            y: this.snake[this.snakeCount - 1].y,
          });
          break; //向左走
        case 2:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x,
            y: this.snake[this.snakeCount - 1].y - 15,
          });
          break;
        case 3:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x + 15,
            y: this.snake[this.snakeCount - 1].y,
          });
          break;
        case 4:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x,
            y: this.snake[this.snakeCount - 1].y + 15,
          });
          break;
        case 5:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x - 15,
            y: this.snake[this.snakeCount - 1].y - 15,
          });
          break;
        case 6:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x + 15,
            y: this.snake[this.snakeCount - 1].y + 15,
          });
          break;
        default:
          this.snake.push({
            x: this.snake[this.snakeCount - 1].x + 15,
            y: this.snake[this.snakeCount - 1].y,
          });
      }
      this.snake.shift(); //删除数组第一个元素
      this.ctx.clearRect(0, 0, 870, 600); //清除画布重新绘制
      this.isEat();
      this.isDead();
      this.drawtable();
    },
    addfood() {
      this.foodx = Math.floor(Math.random() * 60) * 15; //随机产生一个0-1之间的数
      this.foody = Math.floor(Math.random() * 40) * 15;

      for (var k = 0; k < this.snake; k++) {
        if (this.foodx == this.snake[k].x && this.foody == this.sanke[k].y) {
          //防止产生的随机食物落在蛇身上
          this.addfood();
        }
      }
    },
  },
  destroyed() {
      this.drawtable = null;
      this.start = null;
      this.isEat = null;
      this.isDead = null;
      this.keydown = null;
      this.move = null;
      this.addfood = null;
  },
};
</script>
<style lang="scss" scoped>
.map {
  margin: 0px auto;
  height: 600px;
  width: 870px;
  background: #00d0ff;
  border: 10px solid #afaeb2;
  border-radius: 8px;
}
</style>