import store from '../store'

export const auth = (to, from, next) => {
  if (store.getters.authCheck) {
    next()
  } else {
    store.dispatch('setError', 'Firstly you should login!')
    next('/login')
  }
}

export const guest = (to, from, next) => {
  if (store.getters.guestCheck) {
    next()
  } else {
    store.dispatch('setError', 'You already logged in!')
    next('/')
  }
}
