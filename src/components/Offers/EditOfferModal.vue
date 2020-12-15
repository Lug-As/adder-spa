<template>
  <v-dialog
    v-model="dialog"
    persistent
    no-click-animation
    max-width="720"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="success"
        dark
        large
        v-on="on"
        slot="activator"
      >Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit offer</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <app-offer-form
                ref="offerForm"
                :offer="offer"
                :controls="false"
                @submit="updateOffer"
              ></app-offer-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="cancelEdit"
        >
          Cancel
        </v-btn>
        <v-btn
          :loading="loading"
          color="success"
          @click="saveEdit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OfferForm from '@/views/OfferForm'

export default {
  data () {
    return {
      dialog: false
    }
  },
  props: {
    offer: {
      required: true
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    appOfferForm: OfferForm
  },
  methods: {
    updateOffer (newOffer) {
      this.$store.dispatch('updateOffer', {
        id: this.offer.id,
        ...newOffer
      })
        .then(() => {
          this.closeModal()
        })
    },
    cancelEdit () {
      this.$refs.offerForm.setDefaultForm()
      this.closeModal()
    },
    saveEdit () {
      this.$refs.offerForm.fireSubmitEvent()
    },
    closeModal () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
