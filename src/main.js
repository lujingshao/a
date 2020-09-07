import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './static/css/react.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import "echarts/lib/chart/map";
import 'echarts/map/js/china.js'
Vue.config.productionTip = false
import VueAMap from 'vue-amap'

import './promatent.js' // 登录鉴权

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'c0eeee9daea47a6061e46a3dd93eacd0',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
