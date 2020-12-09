import Vue from 'vue'
import Vuex from 'vuex'
import offers from './offers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    offers
  }
})
