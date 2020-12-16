<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-subheader class="text-h6">Orders</v-subheader>
        <v-list
          v-if="orders.length"
          subheader
          two-line
          flat
        >
          <v-list-item-group
            multiple
          >
            <v-list-item
              v-for="(order, index) of orders"
              :key="index"
              @click="markDone(order)"
            >
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.viewed"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="blue" dark @click.prevent.stop="">Open ad</v-btn>
              </template>
            </v-list-item>
          </v-list-item-group>
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
export default {
  methods: {
    markDone (order) {
      order.done = true
      // this.orders = this.orders.filter(item => item.id !== order.id)
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
  }
}
</script>

<style scoped>

</style>
