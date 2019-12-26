<template>
  <v-container class="mt-5">
    <div>
      <h2 class="mt-5 display-1 font-weight-medium" style="color:#278AB0;">We help you planning your trip to Heide Park</h2>
      <div style="width:100px; margin:0 auto;" class="mt-5"><hr></div>
      <p class="container mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
         dolore magna aliqua. Sit amet dictum sit amet justo donec enim diam. Pulvinar pellentesque habitant morbi tristique senectus et.
          Vulputate ut pharetra sit amet aliquam id. Massa massa ultricies mi quis hendrerit dolor. Diam sit amet nisl suscipit adipiscing
          bibendum est. Eros in cursus turpis massa. Diam quis enim lobortis scelerisque fermentum.</p>
    </div>
    <div>
      <v-img height="500px;" :src="require('@/assets/Intro-Page/heide_park1.jpg')"></v-img>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomeInfo'
}
</script>

<style>
hr{
  border-top: 5px solid #278AB0;
  border-spacing: 0;
}
</style>
