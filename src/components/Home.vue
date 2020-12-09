<template>
  <v-container fluid fill-height>
    <v-row align-start>
      <v-flex>
        <h2 class="text-center text-h4 mb-5">Top Offers</h2>
        <v-carousel
          show-arrows-on-hover
          hide-delimiters
          height="400"
        >
          <v-carousel-item
            v-for="(item, key) in items"
            :key="key"
            :src="item.src"
            :to="item.link"
          >
            <v-layout fill-height justify-center align-end>
              <v-btn text class="text-h6 mb-4 offer-title">{{ item.title }}</v-btn>
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
        v-for="(item, key) in items"
        :key="key"
        cols="4"
      >
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.src"
            :to="item.link"
          ></v-img>

          <v-card-title class="pb-0">
            {{ item.title }}
          </v-card-title>

          <v-card-text class="text--primary">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem blanditiis cum ducimus illum
              laudantium necessitatibus perspiciatis quam similique ullam.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Open</v-btn>

            <v-btn color="blue" dark>Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        title: 'Consectetur adipisicing elit. Labore.',
        link: '/offer/1'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Lorem ipsum ad, nemo.',
        link: '/offer/2'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Fugit, quae! Lorem ipsum dolor amet.',
        link: '/offer/3'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        title: 'Lorem ipsum cum, explicabo.',
        link: '/offer/4'
      }
    ]
  })
}
</script>

<style scoped>
.offer-title {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 5px 7px;
}
</style>
