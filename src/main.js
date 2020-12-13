import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueSilentbox from 'vue-silentbox'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueSilentbox)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  beforeCreate () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBqmZlNzZZHIiBthf8b_JPI4DNDVylIU8k',
      authDomain: 'adder-app.firebaseapp.com',
      projectId: 'adder-app',
      storageBucket: 'adder-app.appspot.com',
      messagingSenderId: '90043905705',
      appId: '1:90043905705:web:cf5b1bee350fc29c399bb8'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user)
      }
    })
  }
}).$mount('#app')
