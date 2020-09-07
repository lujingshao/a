<template>
  <div>{{ a }}</div>
</template>
<script>
 
import { mapGetters } from 'vuex'
export default {
  name: 'test',
  computed: {
    ...mapGetters(["a"])
  }
}
</script>
<style lang="scss" scoped>
  
</style>