<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >

    <div  >
      <v-img
      src="Background_Color.png"
      
        class="pa-4 pt-7"
        height="170"
       gradient="to top right, rgba(0, 138, 230,.1), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img
            src="bjjghppjgjz.png"
            alt="User"
          >
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          Charles Cox
        </div>
        <div class="white--text text-subtitle-2">
          Username: User64
        </div>
      </v-img>
    </div>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      prominent
      height="170"
      
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top left, rgba(0, 138, 230,.1), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <!-- <search /> -->
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h3 ml-4">
            To Do
          </v-toolbar-title>
        </v-row>
        <v-row>
          <!-- <live-date-time /> -->
        </v-row>
        <v-row v-if="$route.path === '/'">
          <!-- <field-add-task /> -->
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!-- <snackbar /> -->
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
          { title: 'To Do', icon: 'mdi-format-list-checks', to: '/' },
          { title: 'How To', icon: 'mdi-timeline-help', to: '/HowTo' },
          { title: 'Charts', icon: 'mdi-chart-sankey', to: '/components/Charts'},
          { title: 'About', icon: 'mdi-information', to: '/about' },
          { title: 'Calendar', icon: 'mdi-calendar-clock', to: '/calendar' },
      ],
    }),
    mounted() {
      // this.$store.dispatch('getTasks')
    },
  }
</script>

<style lang="sass">
  .header-container
    max-width: none
</style>