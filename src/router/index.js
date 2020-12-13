import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import SignUp from '@/components/Auth/SignUp'
import NewOffer from '@/components/Offers/NewOffer'
import Offer from '@/components/Offers/Offer'
import OfferList from '@/components/Offers/OfferList'
import Orders from '@/components/User/Orders'
import { auth, guest } from './authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/offer/:id',
    props: true,
    name: 'Offer',
    component: Offer
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: guest
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: guest
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: auth
  },
  {
    path: '/new',
    name: 'NewOffer',
    component: NewOffer,
    beforeEnter: auth
  },
  {
    path: '/list',
    name: 'OfferList',
    component: OfferList,
    beforeEnter: auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
