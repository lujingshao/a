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



import './promatent.js' // 登录鉴权


Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
