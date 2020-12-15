import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueSilentbox from 'vue-silentbox'
import firebase from 'firebase/app'
import 'firebase/auth'
import OrderModal from '@/views/OrderModal'

Vue.use(VueSilentbox)
Vue.use(Vuelidate)
Vue.component('app-order-modal', OrderModal)
Vue.config.productionTip = false

new Vue({
  beforeCreate () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBqmZlNzZZHIiBthf8b_JPI4DNDVylIU8k',
      authDomain: 'adder-app.firebaseapp.com',
      projectId: 'adder-app',
      storageBucket: 'adder-app.appspot.com',
      messagingSenderId: '90043905705',
      appId: '1:90043905705:web:cf5b1bee350fc29c399bb8'
    })

    let isAuth = !!+(localStorage.getItem('isAuth'))
    if (!isAuth) {
      isAuth = false
    }
    this.$store.dispatch('setAuthenticated', isAuth)

    firebase.auth().onAuthStateChanged(user => {
      let newIsAuth = false
      if (user) {
        newIsAuth = true
        this.$store.dispatch('setUser', user)
      }
      this.$store.dispatch('setAuthenticated', newIsAuth)
      newIsAuth = String(+newIsAuth)
      localStorage.setItem('isAuth', newIsAuth)
    })

    this.$store.dispatch('loadOffers')
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
