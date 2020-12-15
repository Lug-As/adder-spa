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
    },
    updateOffer (state, newOffer) {
      const key = state.offers.findIndex(item => item.id === newOffer.id)
      state.offers[key] = newOffer
    }
  },
  actions: {
    async loadImage (context, {
      image,
      offerId
    }) {
      const imageExt = image.name.slice(image.name.lastIndexOf('.'))
      const metadata = {
        contentType: 'image/*'
      }
      const uploadTask = await firebase.storage().ref().child('offers/' + offerId + imageExt).put(image, metadata)
      return await uploadTask.ref.getDownloadURL()
    },
    async createOffer ({
      commit,
      getters,
      dispatch
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

        const src = await dispatch('loadImage', {
          image,
          offerId: id
        })

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
    },
    async updateOffer ({
      commit,
      getters,
      dispatch
    }, {
      id,
      title,
      description,
      image,
      promo
    }) {
      function getDiff (oldOffer, newOffer) {
        const keys = Object.keys(oldOffer)
        const difference = {}
        keys.forEach(key => {
          const oldField = oldOffer[key]
          const newField = newOffer[key]
          if (newField !== oldField) {
            difference[key] = newField
          }
        })
        return difference
      }

      commit('setLoading', true)
      commit('setError')
      try {
        const oldOfferFields = getters.offerById(id)
        const oldOffer = new Offer(oldOfferFields.title, oldOfferFields.description, oldOfferFields.userId, oldOfferFields.promo, oldOfferFields.src, oldOfferFields.id)
        let src
        if (image) {
          src = await dispatch('loadImage', {
            image,
            offerId: id
          })
        } else {
          src = oldOffer.src
        }

        const newOffer = new Offer(title, description, getters.user.id, promo, src, id)
        const diff = getDiff(oldOffer, newOffer)
        if (diff) {
          await firebase.database().ref('offers').child(id).update(diff)
        }

        commit('updateOffer', newOffer)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  }
}
