import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import dayjs from 'dayjs'
import axios from 'axios'

Vue.use(Vuex)

interface State {
  today: Date
  fromDate: Date
  toDate: Date
  info: []
  loading: boolean
}

const API_URL =
  'https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec'

export default new Vuex.Store({
  state: {
    today: dayjs(new Date()).format('YYYY-MM-DD'),
    fromDate: dayjs(new Date())
      .add(-13, 'day')
      .format('YYYY-MM-DD'),
    toDate: dayjs(new Date()).format('YYYY-MM-DD'),
    info: [],
    loading: false
  },

  actions: {
    async getJSON() {
      let JSON = {
        _info: [],
        get info() {
          return this._info
        },
        set info(value) {
          this._info = value
        },

        _loading: false,
        get loading() {
          return this._loading
        },
        set loading(value) {
          this._loading = value
        }
      }
      await axios
        .get(API_URL)
        .then(response => (JSON.info = response.data))
        .finally(
          () => (
            (JSON.loading = true),
            this.commit('setInfo', JSON.info),
            this.commit('setLoading', JSON.loading)
          )
        )
    }
  },

  mutations: {
    setInfo(state, info) {
      state.info = info
      console.log('setInfo:' + state.info.length)
    },
    setLoading(state, loading) {
      state.loading = loading
      console.log('setLoading:' + state.loading)
    }
  }
})
