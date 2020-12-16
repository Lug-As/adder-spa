import firebase from 'firebase/app'
import 'firebase/database'

class Order {
  constructor (phone, offerId, name = null, userId = null, done = false, id = null) {
    this.phone = phone
    this.offerId = offerId
    this.done = done
    this.id = id
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
    orders (s, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    },
    doneOrders (s, getters) {
      return getters.formattedOrders.filter(order => order.done)
    },
    undoneOrders (s, getters) {
      return getters.formattedOrders.filter(order => !order.done)
    },
    formattedOrders (state) {
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
    },
    markDone (state, id) {
      console.log('Mark', id)
      // state.orders = state.orders.map(order => {
      //   if (order.id === id) {
      //     order.done = true
      //   }
      //   return order
      // })
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
      if (!getters.userCheck) return
      console.log('Load orders')
      commit('setError')
      commit('setLoading', true)
      try {
        const result = await firebase.database().ref('orders/' + getters.id).once('value')
        const value = result.val()
        const orders = []
        Object.keys(value).forEach(key => {
          const item = value[key]
          const order = new Order(item.phone, item.offerId, item.name, item.userId, item.done, key)
          orders.push(order)
        })
        commit('setOrders', orders)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async markDone ({
      commit,
      getters
    }, orderId) {
      if (!getters.userCheck) return
      commit('setError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('orders/' + getters.id).child(orderId).update({
          done: true
        })
        commit('markDone', orderId)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  }
}
