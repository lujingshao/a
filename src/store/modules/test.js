const test = {
  state: {
    a: 1000,
  },
  
  mutations: {
    INDEX_FN: (state, data) => {
      state.a = data
    }
  },

  actions: {
    IndexFn({ commit, state, dispatch }, data) {
      commit("INDEX_FN", data)
    }
  }
}

export default test