<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-row v-if="offer">
          <v-col md="9">
            <v-card>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card class="offer-image text-center">
                    <silent-box
                      :image="{src: offer.src, thumbnailHeight: 400}"
                    >
                      <template v-slot:silentbox-item="">
                        <img class="offer-image" :src="offer.src" :alt="offer.title" style="margin-bottom: -8px;">
                        <v-fade-transition>
                          <v-overlay
                            v-if="hover"
                            absolute
                            opacity="0.25"
                            z-index="0"
                          >
                            <v-icon large>mdi-magnify-plus-outline</v-icon>
                          </v-overlay>
                        </v-fade-transition>
                      </template>
                    </silent-box>
                  </v-card>
                </template>
              </v-hover>
              <div class="card-body">
                <v-card-title class="text-h4">{{ offer.title }}</v-card-title>
                <v-card-text class="pb-1">
                  <p class="mb-0">{{ offer.description }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <app-edit-offer-modal
                    v-if="isOwner"
                    :offer="offer"
                  ></app-edit-offer-modal>
                  <v-btn
                    v-else
                    color="primary"
                    dark
                    large
                  >Buy
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card v-if="offer" class="text-center">
              <v-card-subtitle class="text-h6 text--secondary">Seller</v-card-subtitle>
              <v-avatar size="200" class="avatar">
                <v-img :src="user.photo"></v-img>
              </v-avatar>
              <v-card-title class="justify-center flex-column">
                <h5 class="text-h5">{{ user.name }}</h5>
                <h6 class="subtitle-1 text--secondary">More than 1 month on service</h6>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <div class="text-center" v-if="starterLoading">
              <v-progress-circular
                :size="75"
                class="mt-12"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <h2 v-else class="text-center text-h2 error--text">404 Not Found</h2>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditOfferModal from '@/components/Offers/EditOfferModal'

export default {
  components: {
    appEditOfferModal: EditOfferModal
  },
  props: {
    id: {
      required: true
    }
  },
  data: () => ({
    user: {
      name: 'Ivan',
      photo: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    }
  }),
  computed: {
    offer () {
      return this.$store.getters.offerById(this.id)
    },
    starterLoading () {
      return this.$store.getters.starterOffersLoading
    },
    isAuth () {
      return this.$store.getters.authCheck
    },
    isOwner () {
      return this.isAuth && this.$store.getters.user.id === this.offer.userId
    }
  }
}
</script>

<style scoped>
.avatar {
  border-radius: 50%;
}

.card-body {
  padding: 10px;
}

.offer-image {
  max-height: 400px;
  min-height: 50px;
  max-width: 100%;
  min-width: 50px;
}
</style>
