<template>
  <v-app id="app">
    <Navigation v-show="showComp"></Navigation>
    <router-view id="body-view" />
    <Footer v-show="showComp" id="footer"/>
  </v-app>
</template>

<script>
import Navigation from '@/components/common/Nav';
import Footer from '@/components/common/Footer';

export default {
  name: 'App',

  components: {
    Navigation,
    Footer
  },

  computed: {
    showComp () {
      if (this.$route.path === '/admin') {
        return false;
      } else {
        return true;
      }
    }
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

#footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 108px;
}

#body-view {
  position: relative;
  padding-bottom: 108px;
}
</style>
