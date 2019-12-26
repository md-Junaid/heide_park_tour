<template>
  <div>
    <v-toolbar
      dense
      dark
      tile
      class="my-grad"
    >
      <v-toolbar-title><v-img width="150" :src="require('@/assets/HPTlogo.png')"></v-img></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-for="routes in links"
          :key="routes.id"
          text
          class="pa-0 mx-1 .route-style"
          :to="`${routes.page}`"
        >
          {{routes.text}}
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
          text: 'Posts',
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

.my-grad {
  background: #278AB0;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #1C4670, #278AB0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #1C4670, #278AB0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
