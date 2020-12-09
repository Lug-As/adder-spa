<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col md="9">
            <v-card>
              <div class="offer-image">
                <silent-box
                  :image="{src: item.src, thumbnailHeight: 380}"
                ></silent-box>
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
          </v-col>
          <v-col md="3">
            <v-card class="text-center">
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
  data: () => ({
    item: {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      title: 'Consectetur adipisicing elit. Labore.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem. ',
      link: '/offer/1'
    },
    user: {
      name: 'Ivan',
      photo: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    gallery: [
      {}
    ]
  })
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
  overflow: hidden;
  background-color: #eee;
}
</style>
