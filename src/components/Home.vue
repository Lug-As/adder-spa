<template>
  <v-container fluid fill-height>
    <v-row align-start>
      <v-flex>
        <h2 class="text-center text-h4 mb-5">Top Offers</h2>
        <v-carousel
          show-arrows-on-hover
          hide-delimiters
          height="400"
          cycle
        >
          <v-carousel-item
            v-for="(item, key) in promoOffers"
            :key="key"
            :src="item.src"
            :to="offerLink(item.id)"
          >
            <v-layout fill-height justify-center align-end>
              <h3 class="text-center text-md-h6 mb-4 offer-title">{{ item.title }}</h3>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center heading mt-4">All Offers</h2>
      </v-col>
      <v-col
        v-for="(item, key) in offers"
        :key="key"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card>
          <router-link :to="offerLink(item.id)" tag="div" class="pointer">
            <v-img
              height="200px"
              :src="item.src"
            ></v-img>
          </router-link>

          <v-card-title class="pb-0">
            <router-link :to="offerLink(item.id)" tag="span" class="pointer">{{
                item.title
              }}
            </router-link>
          </v-card-title>

          <v-card-text class="text--primary">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem blanditiis cum ducimus illum
              laudantium necessitatibus perspiciatis quam similique ullam.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text :to="offerLink(item.id)">Open</v-btn>

            <v-btn color="blue" dark>Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { offerLinkMixin } from '@/mixins'

export default {
  computed: {
    promoOffers () {
      return this.$store.getters.promoOffers
    },
    offers () {
      return this.$store.getters.offers
    }
  },
  mixins: [offerLinkMixin]
}
</script>

<style scoped>
.offer-title {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 5px 7px;
}

.pointer {
  cursor: pointer;
}
</style>
