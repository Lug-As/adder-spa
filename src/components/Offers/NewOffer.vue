<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col xs="12">
            <h2 class="text-h4 text-center text--secondary">New Offer</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" offset-md="3">
            <app-offer-form
              @submit="createOffer"
            ></app-offer-form>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OfferForm from '@/views/OfferForm'

export default {
  methods: {
    createOffer (newOffer) {
      this.$store.dispatch('createOffer', newOffer)
        .then(() => this.$router.push({ name: 'OfferList' }))
    }
  },
  components: {
    appOfferForm: OfferForm
  }
}
</script>
