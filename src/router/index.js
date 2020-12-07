import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import SignUp from '@/components/Auth/SignUp'
import NewOffer from '@/components/Offers/NewOffer'
import Offer from '@/components/Offers/Offer'
import OfferList from '@/components/Offers/OfferList'
import Orders from '@/components/User/Orders'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/new',
    name: 'NewOffer',
    component: NewOffer
  },
  {
    path: '/offer/:id',
    name: 'Offer',
    component: Offer
  },
  {
    path: '/list',
    name: 'OfferList',
    component: OfferList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
