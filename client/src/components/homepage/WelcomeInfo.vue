<template>
  <v-container class="mt-5">
    <h2
      class="mt-5 display-1 font-weight-medium"
      :class="$vuetify.breakpoint.xsOnly ? 'title' : ''"
      style="color:#278AB0;"
    >
      We help you plan your trip to Heide Park Resort
    </h2>
    <div style="width:125px; margin:0 auto;" class="mt-5"><v-divider class="hr"/></div>
    <v-card
      class="container mt-5"
      :width="$vuetify.breakpoint.mdAndUp ? '800px' : ''"
      flat
      color="transparent"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Sit amet dictum sit amet justo donec enim diam. Pulvinar pellentesque habitant morbi tristique senectus et.
      Vulputate ut pharetra sit amet aliquam id. Massa massa ultricies mi quis hendrerit dolor. Diam sit amet nisl suscipit adipiscing
      bibendum est. Eros in cursus turpis massa. Diam quis enim lobortis scelerisque fermentum.
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomeInfo'
}
</script>

<style>
.hr{
  background-color: #278AB0;
  border-top: 5px solid;
  border-radius: 50px;
  max-height: 7px !important;
}
</style>
