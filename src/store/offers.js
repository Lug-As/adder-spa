import firebase from 'firebase/app'
import 'firebase/database'

class Offer {
  constructor (title, description, userId, src = null, promo = false, id = null) {
    this.title = title
    this.description = description
    this.userId = userId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    offers: [],
    starterOffersLoading: true
  },
  getters: {
    offers (state) {
      return state.offers
    },
    promoOffers (state) {
      return state.offers.filter(offer => offer.promo)
    },
    userOffers (state) {
      return state.offers
    },
    offerById (state) {
      return id => state.offers.find(offer => String(offer.id) === String(id))
    },
    starterOffersLoading (state) {
      return state.starterOffersLoading
    }
  },
  mutations: {
    createOffer (state, newOffer) {
      state.offers.push(newOffer)
    },
    setOffers (state, offers) {
      state.offers = offers
    },
    stopStarterOfferLoading (state) {
      state.starterOffersLoading = false
    }
  },
  actions: {
    async createOffer ({
      commit,
      getters
    }, {
      title,
      description,
      src,
      promo
    }) {
      commit('setLoading', true)
      commit('setError')
      try {
        const offer = new Offer(title, description, getters.user.id, src, promo)
        const result = await firebase.database().ref('offers').push(offer)
        commit('createOffer', {
          ...offer,
          id: result.key
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async loadOffers ({ commit, getters }) {
      commit('setError')
      try {
        const result = await firebase.database().ref('offers').once('value')
        const value = result.val()
        const offers = []
        Object.keys(value).forEach(key => {
          const offer = value[key]
          offers.push({
            ...offer,
            id: key
          })
        })
        commit('setOffers', offers)
        commit('stopStarterOfferLoading')
        console.log(getters.starterOffersLoading)
      } catch (e) {
        commit('stopStarterOfferLoading')
        commit('setError', e.message)
        throw e
      }
    }
  }
}
