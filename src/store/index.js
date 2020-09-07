import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import getters from './getters.js'
import test from './modules/test'

Vue.use(Vuex)

const store = new Vuex.Store({
  //存放 vuex的地方 可以把它们进行分类
  modules: {
    test,
  },
  getters, //从state中找到数据 然后 深度复制一份拿来使用 可以修改
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })] // vuex 数据持久化??? 或许吧
})

export default store