<template>
  <div>
    <v-toolbar
      dense
      dark
      tile
      class="my-grad"
      height="60"
    >
      <v-toolbar-title>
        <v-btn
          class="pa-0"
          color="transparent"
          depressed
          :to="'/'"
          :ripple="false"
          outlined
        >
          <v-img class="ml-2 pl-1" width="140" :src="require('@/assets/HPTlogo.png')"></v-img>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-app-bar-nav-icon > -->
        <v-menu
          offset-y
          v-if="$vuetify.breakpoint.xsOnly"
          transition="slide-y-transition"
          nudge-bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="routes in links"
              :key="routes.id"
              :to="`${routes.page}`"
            >
              <v-list-item-title>{{ routes.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      <!-- </v-app-bar-nav-icon> -->

      <v-toolbar-items v-else>
        <v-btn
          v-for="routes in links"
          :key="routes.id"
          text
          class="pa-0 mx-1 .route-style"
          :to="`${routes.page}`"
        >
          <span
            class="caption custom-font"
          >
            {{routes.text}}
          </span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navigation',

  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'Attractions',
          page: '/posts'
        },
        {
          id: 2,
          text: 'Tour Planner',
          page: '/posts'
        }
      ]
    }
  }
}
</script>

<style>
.route-style {
  text-decoration: none;
}

.custom-font {
  font-family: 'Permanent Marker', cursive;
}

.my-grad {
  background: #278AB0;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1C4670, #278AB0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1C4670, #278AB0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
