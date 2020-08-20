<template>
  <el-row class="header">
    <el-col :span="10">
        <img src="http://www.zua.edu.cn/dfiles/9832/common/images/htmlimage/logo.png" alt="">
    </el-col>
    <el-col :span="14">退出</el-col>
  </el-row>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style lang="scss" scoped>
.header{
    height: 100%;
    padding: 6px 0px;
    >.el-col-10> img{
        width: 340px;
        height: auto;
        display: block;
    }
    >.el-col-14{
        text-align: right;
        padding-right: 20px;
        line-height: 48px;
        font-size: 16px;
        color:white;
        cursor: pointer;
    }
}
</style>