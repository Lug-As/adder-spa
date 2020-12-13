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
                     :exact="link.exact"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="authCheck" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-run</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :color="mainColor" dark>
      <v-app-bar-nav-icon @click="toggleDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{name: 'Home'}" tag="span" class="pointer">Adder</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text
               v-for="link in links"
               :to="link.url"
               :key="link.title"
               :exact="link.exact"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn v-if="authCheck" text @click="logout">
          <v-icon left>mdi-exit-run</v-icon>
          Logout
        </v-btn>
        <v-btn text @click="toggleTheme">
          <v-icon>{{ themeIcon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-main>

    <template v-if="error">
      <v-snackbar
        :timeout="6000"
        :value="true"
        multi-line
        color="error"
        @input="clearError"
      >
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click.native="clearError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    mainColor: 'blue'
  }),
  methods: {
    toggleDrawer (forceState = null) {
      if (forceState === null) {
        this.drawer = !this.drawer
        return
      }
      this.drawer = forceState
    },
    toggleTheme () {
      const newTheme = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = newTheme
      localStorage.setItem('themeDark', +newTheme)
    },
    clearError () {
      this.$store.dispatch('setError')
    },
    logout () {
      this.$store.dispatch('logoutUser')
      const redirectTo = 'Home'
      if (this.$route.name !== redirectTo) {
        this.$router.push({ name: redirectTo })
      } else {
        this.toggleDrawer(false)
      }
    }
  },
  computed: {
    themeIcon () {
      if (!this.$vuetify.theme.dark) {
        return 'mdi-weather-night'
      }
      return 'mdi-white-balance-sunny'
    },
    error () {
      return this.$store.getters.error
    },
    authCheck () {
      return this.$store.getters.authCheck
    },
    links () {
      let links = [
        {
          title: 'Home',
          icon: 'mdi-home',
          exact: true,
          url: {
            name: 'Home'
          }
        }
      ]
      if (this.authCheck) {
        links = links.concat([
          {
            title: 'Orders',
            icon: 'mdi-bookmark',
            url: {
              name: 'Orders'
            }
          },
          {
            title: 'New offer',
            icon: 'mdi-note-plus',
            url: {
              name: 'NewOffer'
            }
          },
          {
            title: 'My offers',
            icon: 'mdi-view-list',
            url: {
              name: 'OfferList'
            }
          }
        ])
        return links
      }
      links = links.concat([
        {
          title: 'Login',
          icon: 'mdi-login',
          url: {
            name: 'Login'
          }
        },
        {
          title: 'Sign Up',
          icon: 'mdi-face',
          url: {
            name: 'SignUp'
          }
        }
      ])
      return links
    }
  },
  mounted () {
    const themeDark = !!+(localStorage.getItem('themeDark'))
    if (themeDark) {
      this.$vuetify.theme.dark = themeDark
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
