<template>
  <div>
    {{ a }}
    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  data(){
    return {
       num: 1,
    }
  },
  computed: {
    ...mapGetters(["a"])
  },
  methods: {
    handleChange( value ){
      // 这个 dispatch 对应的是 options
      // IndexFn 对应 函数 value 对应 data
      this.$store.dispatch('IndexFn', value)
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>