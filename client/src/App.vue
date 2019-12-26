<template>
  <v-app id="app">
    <Navigation></Navigation>
    <router-view/>
  </v-app>
</template>

<script>
import Navigation from '@/components/common/Nav'

export default {
  name: 'App',

  components: {
    'Navigation': Navigation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #EAEAE0; */
}
html{
  overflow-y: auto;
}
</style>
