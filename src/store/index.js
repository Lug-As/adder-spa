import Vue from 'vue'
import Vuex from 'vuex'
import offers from '@/store/offers'
import users from '@/store/users'
import shared from '@/store/shared'
import orders from '@/store/orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    offers,
    users,
    shared,
    orders
  }
})
