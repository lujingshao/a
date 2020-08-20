<template>
  <el-container class="Index">
    <el-header style="padding:0px;background: #0e559f;"><Header /></el-header>
    <el-container>
      <el-aside width="200px" style="background:#0e559f;"><Aside /></el-aside>
      <el-main><Main /></el-main>
    </el-container>
  </el-container>
</template>
<script>
import Aside from '@/view/index/Trunk/aside.vue'
import Header from '@/view/index/Trunk/header.vue'
import Main from '@/view/index/Trunk/main.vue'
export default {
  name: "index",
  components: { Aside, Header, Main },
  data(){
      return {

      }
  },
  created(){

  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.Index {
  height: 100vh;
}
</style>