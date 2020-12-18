<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-subheader class="text-h6">Orders</v-subheader>
        <v-list
          v-if="orders.length"
          two-line
        >
          <v-list-item
            v-for="(order, index) of orders"
            :key="index"
          >
            <template>
              <v-list-item-action>
                <v-btn
                  small
                  :color="order.done ? 'primary' : ''"
                  :title="order.done ? 'This order already viewed' : 'Mark this order viewed'"
                  @click.prevent="markDone(order.id)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                dark
                color="primary"
                :to="offerLink(order.offerId)"
              >Open ad
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-row v-else>
          <v-col cols="12">
            <div class="text-center" v-if="starterLoading || loading">
              <v-progress-circular
                :size="45"
                class="mt-10"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <h3
              v-else
              class="body-1 text--secondary text-center mt-8"
            >
              You have no orders yet
            </h3>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { offerLinkMixin } from '@/mixins'

export default {
  methods: {
    markDone (orderId) {
      if (!this.isActive(orderId)) {
        this.$store.dispatch('markDone', orderId)
      }
    },
    isActive (id) {
      let active = false
      this.orders.forEach(order => {
        if (order.id === id && order.done) {
          active = true
        }
      })
      return active
    }
  },
  computed: {
    orders () {
      return this.$store.getters.orders
    },
    starterLoading () {
      return this.$store.getters.starterOffersLoading
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    this.$store.dispatch('loadOrders')
  },
  mixins: [offerLinkMixin]
}
</script>

<style scoped>

</style>
