import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

class Offer {
  constructor (title, description, userId, promo = false, src = null, id = null) {
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
      image,
      promo
    }) {
      commit('setLoading', true)
      commit('setError')
      try {
        const offer = new Offer(title, description, getters.user.id, promo)
        const result = await firebase.database().ref('offers').push(offer)
        const id = result.key

        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const metadata = {
          contentType: 'image/*'
        }
        const uploadTask = await firebase.storage().ref().child('offers/' + result.key + imageExt).put(image, metadata)
        const src = await uploadTask.ref.getDownloadURL()

        await firebase.database().ref('offers').child(id).update({
          src
        })

        commit('createOffer', {
          ...offer,
          id,
          src
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async loadOffers ({ commit }) {
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
      } catch (e) {
        commit('stopStarterOfferLoading')
        commit('setError', e.message)
        throw e
      }
    }
  }
}
