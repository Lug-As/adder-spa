import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async createUser ({ commit }, {
      email,
      password
    }) {
      commit('setLoading', true)
      commit('setError')
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', { id: user.uid })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async loginUser ({ commit }, {
      email,
      password
    }) {
      commit('setLoading', true)
      commit('setError')
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', { id: user.uid })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  }
}
