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
    doneOrders (s, getters) {
      return getters.rawOrders.filter(order => order.done)
    },
    undoneOrders (s, getters) {
      return getters.rawOrders.filter(order => !order.done)
    },
    rawOrders (state) {
      return state.orders.map(order => {
        const number = order.phone
        const pattern = new RegExp(`(^\\d{${number.length % 10}})(\\d{3})(\\d{2})(\\d{2})(\\d{3}$)`)
        order.phone = number.replace(pattern, '+$1 ($2) $3-$4-$5')
        return order
      })
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
