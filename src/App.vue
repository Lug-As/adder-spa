<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary class="hidden-md-and-up">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link
                     v-for="link in links"
                     :to="link.url"
                     :key="link.title"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :color="mainColor">
      <v-app-bar-nav-icon @click="toggleDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>Adder</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="transparent" elevation="0"
               v-for="link in links"
               :to="link.url"
               :key="link.title"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    links: [
      { title: 'Login', icon: 'mdi-login-variant', url: '/login' },
      { title: 'Sign Up', icon: 'mdi-face-outline', url: '/signup' },
      { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
      { title: 'New offer', icon: 'mdi-note-plus-outline', url: '/new' },
      { title: 'My offers', icon: 'mdi-view-list-outline', url: '/list' }
    ],
    mainColor: 'blue darken-1'
  }),
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
