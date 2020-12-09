<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col md="9">
            <v-card v-if="item">
              <div class="offer-image text-center">
                <silent-box
                  :image="{src: item.src, thumbnailHeight: 400}"
                >
                  <template v-slot:silentbox-item="">
                    <img class="offer-image" :src="item.src" :alt="item.title">
                  </template>
                </silent-box>
              </div>
              <div class="card-body">
                <v-card-title class="text-h4">{{ item.title }}</v-card-title>
                <v-card-text class="pb-1">
                  <p class="mb-0">{{ item.description }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue"
                    dark
                    large
                  >Buy
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
            <h2 v-else class="text-center text-h2 error--text">404 Not Found</h2>
          </v-col>
          <v-col md="3">
            <v-card v-if="item" class="text-center">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    user: {
      name: 'Ivan',
      photo: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    gallery: [
      {}
    ]
  }),
  computed: {
    item () {
      console.log(this.$store.getters.offerById(this.id))
      return this.$store.getters.offerById(this.id)
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
