<template>
  <v-form @submit.prevent="fireSubmitEvent">
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
    <v-row class="mt-3 mb-5" v-if="src">
      <v-img
        max-height="200"
        max-width="200"
        :src="src"></v-img>
    </v-row>

    <v-row v-if="controls">
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        @click="fireSubmitEvent"
        :disabled="$v.$invalid"
        :dark="!$v.$invalid"
      >
        Create Offer
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    description: '',
    promo: false,
    image: null,
    src: ''
  }),
  props: {
    offer: {
      type: Object,
      required: false
    },
    controls: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    fireSubmitEvent () {
      if (!this.$v.$invalid && !!this.src) {
        const newOffer = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$emit('submit', newOffer)
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    loadImage (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = ev => (this.src = reader.result)
      reader.readAsDataURL(file)
      this.image = file
    },
    setDefaultForm () {
      if (this.offer) {
        this.title = this.offer.title
        this.description = this.offer.description
        this.promo = this.offer.promo
        this.src = this.offer.src
      } else {
        this.title = ''
        this.description = ''
        this.promo = false
        this.image = null
        this.src = ''
      }
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
  },
  created () {
    this.setDefaultForm()
  }
}
</script>
