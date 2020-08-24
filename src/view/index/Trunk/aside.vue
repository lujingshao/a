<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="1-1"
        background-color="#0e559f"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基本功能</span>
          </template>
          <el-menu-item index="1-1" @click="myRouter('/home/tables')">表格</el-menu-item>
          <el-menu-item index="1-2" @click="myRouter('/home/maps')">地图</el-menu-item>
          <el-menu-item index="1-3" @click="myRouter('/home/echars')">图表</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">三级菜单</template>
            <el-menu-item index="1-4-1">1</el-menu-item>
            <el-menu-item index="1-4-2">2</el-menu-item>
            <el-menu-item index="1-4-3">3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "Aside",
  methods: {
    myRouter(url){
      this.$router.push(url);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>