<template>
  <v-dialog
    v-model="dialog"
    no-click-animation
    max-width="620"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        :large="large"
        v-on="on"
        slot="activator"
      >
        Buy
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3 class="text-h5">Buy it?</h3>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-if="isGuest"
                v-model="name"
                :error-messages="nameErrors"
                label="Name"
                required
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="publicPhone"
                v-mask="phoneMask"
                :error-messages="phoneErrors"
                label="Phone"
                required
                autocomplete="off"
                @blur="$v.phone.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="cancelOrder"
        >
          Cancel
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="$v.$invalid || loading"
          color="success"
          @click="createOrder"
        >
          Buy
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { VueMaskDirective } from 'v-mask'

export default {
  data () {
    return {
      phone: '',
      name: '',
      publicPhone: '+38 (0',
      dialog: false,
      phoneMask: '+38 (0##)-##-##-###'
    }
  },
  props: {
    offer: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    isGuest () {
      return this.$store.getters.guestCheck
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone number is required')
      !this.$v.phone.phoneNumber && errors.push('Phone number must be correct')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Must be max ' + this.$v.name.$params.maxLength.max)
      !this.$v.name.required && errors.push('Name is required')
      return errors
    }
  },
  methods: {
    cancelOrder () {
      this.closeModal()
    },
    createOrder () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const newOrder = {
          phone: this.phone,
          offerId: this.offer.id
        }
        if (this.isGuest) {
          newOrder.name = this.name
        }
        this.$store.dispatch('createOrder', newOrder)
        this.closeModal()
      }
    },
    closeModal () {
      this.dialog = false
      this.phone = ''
      this.publicPhone = '+38 (0'
      this.name = ''
      this.$v.$reset()
    }
  },
  watch: {
    publicPhone () {
      this.phone = this.publicPhone.replace(/\D/g, '')
    }
  },
  validations () {
    const valids = {
      phone: {
        required,
        phoneNumber () {
          const val = this.phone.trim()
          return !/\D/.test(val) && val.length === 12 && val.startsWith('380')
        }
      }
    }
    if (this.isGuest) {
      valids.name = {
        required,
        maxLength: maxLength(20)
      }
    }
    return valids
  },
  directives: {
    mask: VueMaskDirective
  }
}
</script>

<style scoped>

</style>
