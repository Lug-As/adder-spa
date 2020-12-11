import Vue from 'vue'
import Vuex from 'vuex'
import offers from './offers'
import users from '@/store/users'
import shared from '@/store/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    offers,
    users,
    shared
  }
})
