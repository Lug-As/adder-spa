<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-toolbar dark color="blue">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="submitLoginForm">
              <v-text-field
                label="Name"
                v-model.trim="name"
                :error-messages="nameErrors"
                :counter="this.$v.name.$params.maxLength.max"
                required
                @blur="$v.name.$touch()"
              >
                <v-icon slot="prepend">mdi-face</v-icon>
              </v-text-field>
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
                       tabindex="-1"
                >
                  <v-icon>mdi-{{ passwordIcon }}</v-icon>
                </v-btn>
              </v-text-field>
              <v-text-field
                label="Confirm password"
                :type="c_passwordType"
                v-model="c_password"
                :error-messages="c_passwordErrors"
                @blur="$v.c_password.$touch()"
              >
                <v-icon slot="prepend">mdi-lock</v-icon>
                <v-btn slot="append"
                       color="transparent" elevation="0"
                       fab small
                       @click.stop.prevent="toggleCPasswordVisible"
                       tabindex="-1"
                >
                  <v-icon>mdi-{{ c_passwordIcon }}</v-icon>
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
            >
              Create account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
    passwordVisible: false,
    c_password: '',
    c_passwordVisible: false
  }),
  methods: {
    submitLoginForm () {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(newUser)
    },
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    },
    toggleCPasswordVisible () {
      this.c_passwordVisible = !this.c_passwordVisible
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Must be max ' + this.$v.name.$params.maxLength.max)
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('Must be min ' + this.$v.password.$params.minLength.min + ' chars')
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
    },
    c_passwordErrors () {
      const errors = []
      if (!this.$v.c_password.$dirty) return errors
      !this.$v.c_password.required && errors.push('Confirm password is required')
      this.$v.password.$invalid && errors.push('Firstly you should fill in password correctly')
      !this.$v.c_password.sameAs && errors.push('Passwords should match')
      return errors
    },
    c_passwordType () {
      if (this.c_passwordVisible) {
        return 'text'
      }
      return 'password'
    },
    c_passwordIcon () {
      if (this.c_passwordVisible) {
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
    },
    name: {
      required,
      maxLength: maxLength(20)
    },
    c_password: {
      required,
      sameAs: sameAs('password')
    }
  }
}
</script>

<style scoped>

</style>
