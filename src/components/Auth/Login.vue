<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-toolbar dark color="blue">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="submitLoginForm">
              <v-text-field
                label="E-mail"
                type="email"
                v-model.trim="email"
                :error-messages="emailErrors"
                required
                @blur="$v.email.$touch()"
              >
                <v-icon slot="prepend">mdi-email</v-icon>
              </v-text-field>
              <v-text-field
                label="Password"
                :type="passwordType"
                v-model="password"
                :error-messages="passwordErrors"
                @blur="$v.password.$touch()"
              >
                <v-icon slot="prepend">mdi-lock</v-icon>
                <v-btn slot="append"
                       color="transparent" elevation="0"
                       fab small
                       @click.stop.prevent="togglePasswordVisible"
                >
                  <v-icon>mdi-{{ passwordIcon }}</v-icon>
                </v-btn>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue"
                   :dark="!$v.$invalid"
                   :disabled="$v.$invalid"
                   @click.prevent="submitLoginForm"
            >Enter</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
    passwordVisible: false
  }),
  methods: {
    submitLoginForm () {
      const newUser = {
        email: this.email,
        password: this.password
      }
      console.log(newUser)
    },
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Must be min 6 chars')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    passwordType () {
      if (this.passwordVisible) {
        return 'text'
      }
      return 'password'
    },
    passwordIcon () {
      if (this.passwordVisible) {
        return 'eye'
      }
      return 'eye-off'
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    }
  }
}
</script>

<style scoped>

</style>
