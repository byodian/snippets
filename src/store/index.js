import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 地图点标志类型
    // [{type: '', title: ''}, //...]
    options: []
  },
  mutations: {
    SET_OPTIONS (state, payload) {
      state.options = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
