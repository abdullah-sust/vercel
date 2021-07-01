<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
        class="primary accent-4"
        dark
        temporary
        absolute
        v-model="drawer"
    >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon @click="onNavItemClicked(item)">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="onNavItemClicked(item)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    isLoggedIn: false,
    items: []
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  created () {
    this.initialize()
  },
  methods: {

    initialize () {
      if (localStorage.getItem('isUserLoggedIn') === '1') {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
      if (this.isLoggedIn) {
        this.items = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'All questions', icon: 'mdi-clipboard-list' },
          { title: 'My account', icon: 'mdi-account-box' },
          { title: 'Logout', icon: 'mdi-arrow-left' }
        ]
      } else {
        this.items = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'All questions', icon: 'mdi-clipboard-list' },
          { title: 'Login', icon: 'mdi-arrow-right' }
        ]
      }
    },
    onNavItemClicked (item) {
      if (item.title === 'All questions' || item.title === 'Dashboard') {
        this.$router.push('/question-list')
      }
      if (item.title === 'Logout') {
        localStorage.removeItem('isUserLoggedIn')
        location.reload()
      }
      if (item.title === 'Login') {
        this.$router.push('/login')
      }
    }
  }
})
</script>

<style scoped>
.btn {
  background-color: white !important;
}
.text-color {
  color: blue !important;
}
</style>
