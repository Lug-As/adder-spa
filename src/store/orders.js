export default {
  state: {
    orders: []
  },
  getters: {
    orders (state) {
      return state.orders
    }
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    createOrder ({ commit }, payload) {
      commit('createOrder', payload)
    }
  }
}
