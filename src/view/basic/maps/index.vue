<template>
  <div class="maps">
    <myMap></myMap>
  </div>
</template>
<script>
export default {
  name:'mpa',
  components: {
    myMap: () => import("@/components/maps.vue")
  }
}
</script>
<style lang="scss" scoped>
  .maps{
    width: 100%;
    height: 100%;
  }
</style>