<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col xs="12">
            <h2 class="text-h4 text-center">My Offers</h2>
          </v-col>
        </v-row>
        <v-row>
          <template v-if="myOffers.length">
            <v-col
              xs="12" md="6" offset-md="3"
              v-for="(item, index) of myOffers"
              :key="index"
            >
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 10 : 2" hover class="offer-card">
                  <v-row>
                    <v-col cols="3">
                      <router-link :to="offerLink(item.id)">
                        <v-avatar
                          class="ml-3 mt-2"
                          size="145"
                          rounded
                        >
                          <v-img :src="item.src"></v-img>
                        </v-avatar>
                      </router-link>
                    </v-col>
                    <v-col cols="9">
                      <v-card-title
                        class="text-h6 pb-2"
                      >
                        <router-link :to="offerLink(item.id)" tag="span"
                                     class="text-truncate pointer">
                          {{ item.title | shortTitle }}
                        </router-link>
                      </v-card-title>
                      <v-card-text class="pb-2">
                        <p class="mb-0">{{ item.description | shortDesc }}</p>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue"
                          dark
                          :to="offerLink(item.id)"
                        >
                          Open
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-col>
          </template>
          <template v-else>
            <v-col xs="12" md="6" offset-md="3">
              <div class="text-center" v-if="starterLoading">
                <v-progress-circular
                  :size="45"
                  class="mt-10"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <template v-else>
                <h5 class="text--secondary text-body-1 text-center mt-6">You don't have any own offer yet.</h5>
              </template>
            </v-col>
          </template>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { offerLinkMixin } from '@/mixins'

export default {
  computed: {
    myOffers () {
      return this.$store.getters.userOffers
    },
    starterLoading () {
      return this.$store.getters.starterOffersLoading
    }
  },
  filters: {
    shortDesc (desc) {
      const maxChars = 108
      let str = desc.substr(0, maxChars)
      str = str.trim()
      if (desc.length > maxChars) {
        str += '...'
      }
      return str
    },
    shortTitle (title) {
      const maxChars = 37
      let str = title.substr(0, maxChars)
      str = str.trim()
      if (title.length > maxChars) {
        str += '...'
      }
      return str
    }
  },
  mixins: [offerLinkMixin]
}
</script>

<style scoped>
.offer-card {
  cursor: auto;
}

.pointer {
  cursor: pointer;
}
</style>
