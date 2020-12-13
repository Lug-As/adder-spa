import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    user: null,
    isAuth: false
  },
  getters: {
    user (state) {
      return state.user
    },
    authCheck (state) {
      return state.isAuth
    },
    guestCheck (state) {
      return !state.isAuth
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    logoutUser (state) {
      state.user = null
      firebase.auth().signOut()
    },
    setAuthenticated (state, payload) {
      state.isAuth = payload
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
    },
    setUser ({ commit }, { uid }) {
      commit('setUser', { id: uid })
    },
    logoutUser ({ commit }) {
      commit('logoutUser')
    },
    setUserAuthenticated () {

    }
  }
}
