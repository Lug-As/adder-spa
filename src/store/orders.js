import firebase from 'firebase/app'
import 'firebase/database'

class Order {
  constructor (phone, offerId, name = null, userId = null, done = false) {
    this.phone = phone
    this.offerId = offerId
    if (userId) {
      this.userId = userId
    } else if (name) {
      this.name = name
    }
  }
}

export default {
  state: {
    orders: []
  },
  getters: {
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    },
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    }
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    },
    setOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({
      commit,
      getters
    }, payload) {
      commit('setLoading', true)
      commit('setError')
      try {
        const order = new Order(payload.phone, payload.offerId)
        if (payload.name) {
          order.name = payload.name
        } else if (getters.authCheck) {
          order.userId = getters.id
        } else {
          throw new Error('Impossible to define user which leave request.')
        }
        const ownerId = getters.offerById(payload.offerId).userId
        const result = await firebase.database().ref('orders/' + ownerId).push(order)
        const id = result.key
        commit('createOrder', {
          ...order,
          id
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async loadOrders ({
      commit,
      getters
    }) {
      commit('setError')
      commit('setLoading', true)
      try {
        const userId = getters.id
        const result = await firebase.database().ref('orders/' + userId).once('value')
        const value = result.val()
        const orders = []
        Object.keys(value).forEach(key => {
          const order = value[key]
          orders.push({
            ...order,
            id: key
          })
        })
        commit('setOrders', orders)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  }
}
