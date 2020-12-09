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
    createOffer ({ commit }, newOffer) {
      newOffer.id = '9999'
      commit('createOffer', newOffer)
    }
  }
}
