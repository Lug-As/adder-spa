<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-list
          subheader
          two-line
          flat
        >
          <v-subheader class="text-h6">Orders</v-subheader>

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

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    orders: [
      {
        id: 1,
        name: 'Vlad',
        phone: '+380994622584',
        viewed: false
      },
      {
        id: 2,
        name: 'Ivan',
        phone: '+380694652784',
        viewed: false
      },
      {
        id: 3,
        name: 'Kirill',
        phone: '+380594342584',
        viewed: false
      },
      {
        id: 4,
        name: 'Kostya',
        phone: '+380544828924',
        viewed: false
      }
    ]
  }),
  methods: {
    markDone (order) {
      order.viewed = true
      // this.orders = this.orders.filter(item => item.id !== order.id)
    }
  }
}
</script>

<style scoped>

</style>
