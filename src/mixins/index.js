export const offerLinkMixin = {
  methods: {
    offerLink (id) {
      return {
        name: 'Offer',
        params: { id }
      }
    }
  }
}
