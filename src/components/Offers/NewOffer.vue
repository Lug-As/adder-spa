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
            <v-form @submit.prevent="">
              <v-text-field
                class="mb-5"
                v-model="title"
                :error-messages="titleErrors"
                :counter="$v.title.$params.maxLength.max"
                label="Title"
                required
                @blur="$v.title.$touch()"
                autocomplete="off"
              ></v-text-field>
              <v-textarea
                clearable
                v-model="description"
                :error-messages="descriptionErrors"
                :counter="$v.description.$params.maxLength.max"
                outlined
                label="Description"
                auto-grow
                required
                @blur="$v.description.$touch()"
              ></v-textarea>
              <v-switch
                v-model="promo"
                label="Add to promo?"
              ></v-switch>
              <v-row>
                <v-btn
                  color="green"
                  dark
                  @click="triggerUpload"
                >
                  Upload
                  <v-icon
                    right
                    dark
                  >
                    mdi-cloud-upload
                  </v-icon>
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="loadImage"
                >
              </v-row>
              <v-row class="mt-3 mb-5" v-if="imageSrc">
                <v-img
                  max-height="200"
                  max-width="200"
                  :src="imageSrc"></v-img>
              </v-row>

              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue"
                  @click="createOffer"
                  :disabled="$v.$invalid"
                  :dark="!$v.$invalid"
                >
                  Create Offer
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    description: '',
    promo: false,
    image: null,
    imageSrc: ''
  }),
  methods: {
    createOffer () {
      if (!this.$v.$invalid) {
        const newOffer = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createOffer', newOffer)
          .then(() => this.$router.push({ name: 'OfferList' }))
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    loadImage (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = ev => (this.imageSrc = reader.result)
      reader.readAsDataURL(file)
      this.image = file
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('Title is required')
      !this.$v.title.maxLength && errors.push('Must be max 6 chars')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Description is required')
      !this.$v.description.maxLength && errors.push('Must be max 6 chars')
      return errors
    }
  },
  validations: {
    title: {
      required,
      maxLength: maxLength(30)
    },
    description: {
      required,
      maxLength: maxLength(2000)
    }
  }
}
</script>

<style scoped>

</style>
