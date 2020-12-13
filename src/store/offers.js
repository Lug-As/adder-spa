import firebase from 'firebase/app'
import 'firebase/database'

class Offer {
  constructor (title, description, userId, imageSrc = null, promo = false, id = null) {
    this.title = title
    this.description = description
    this.userId = userId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    offers: [
      {
        id: '1',
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        title: 'Consectetur adipisicing elit. Labore.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        promo: true
      },
      {
        id: '2',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Lorem ipsum ad, nemo.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        promo: false
      },
      {
        id: '3',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Fugit, quae! Lorem ipsum dolor amet.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        promo: true
      },
      {
        id: '4',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        title: 'Lorem ipsum cum, explicabo.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        promo: true
      }
    ]
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
    }
  },
  mutations: {
    createOffer (state, newOffer) {
      state.offers.push(newOffer)
    }
  },
  actions: {
    async createOffer ({
      commit,
      getters
    }, {
      title,
      description,
      imageSrc,
      promo
    }) {
      commit('setLoading', true)
      commit('setError')
      try {
        const offer = new Offer(title, description, getters.user.id, imageSrc, promo)
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
    }
  }
}
