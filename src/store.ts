import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    today: dayjs(new Date()).format('YYYY-MM-DD')
  },
  mutations: {},
  actions: {}
})
