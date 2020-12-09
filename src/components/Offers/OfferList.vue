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
          <v-col xs="12" md="6" offset-md="3"
                 v-for="(item, index) of items"
                 :key="index"
          >
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 10 : 2" hover class="offer-card">
                <v-row>
                  <v-col cols="3">
                    <router-link :to="item.link">
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
                      <router-link :to="item.link" tag="span" class="text-truncate pointer">
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
                      >
                        Open
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        title: 'Consectetur adipisicing elit. Labore.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        link: '/offer/1'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Lorem ipsum ad, nemo.Lorem ipsum ad, nemo.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        link: '/offer/2'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Fugit, quae! Lorem ipsum dolor amet.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        link: '/offer/3'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        title: 'Lorem ipsum cum, explicabo.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt eligendi iste molestias necessitatibus nostrum odit quam quod sed voluptatem.',
        link: '/offer/4'
      }
    ]
  }),
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
  }
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
