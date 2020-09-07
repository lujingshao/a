<template>
  <div class="maps">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    ></el-amap>
    <div class="toolbar">
      <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
      <span v-else>正在定位</span>
    </div>
  </div>
</template>
<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();

export default {
  name: "maps",
  data() {
    let self = this;
    return {
      amapManager,
      zoom: 12,
      pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: "3D", // 地图模式
      buildingAnimation:true,//楼块出现是否带动画
      center: [116.47356, 39.97908],
      events: {
        init: (o) => {
          o.getCity((result) => {});
        },
        moveend: () => {},
        zoomchange: () => {},
        click: (e) => {},
      },
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss">
.maps {
  width: 100%;
  height: 100%;
}
.amap-demo {
  width: 100%;
  height: 100%;
}
</style>