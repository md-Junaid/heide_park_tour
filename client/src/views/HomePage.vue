<template>
  <div>
    <Carousel
      :style="$vuetify.breakpoint.smAndUp ? 'clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 51.5% 95%, 50% 100%, 48.5% 95%, 0 95%);' : ''"
    />
    <WelcomeInfo />
    <Map />
    <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    top
    :color="snackbarColor"
  >
    {{ msg }}
    <v-btn
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Carousel from '@/components/homepage/Carousel';
import WelcomeInfo from '@/components/homepage/WelcomeInfo';
import Map from '@/components/homepage/Map';

export default {
  name: 'HomePage',

  data () {
    return {
      msg: null,
      snackbarColor: null,
      timeout: 5000,
      snackbar: false
    }
  },

  components: {
    Carousel,
    WelcomeInfo,
    Map
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'getLoggedInStatus',
      loggedMsg: 'getLoggedInMsg',
      getUser: 'getUser'
    })
  },

  watch: {
    isLoggedIn: {
      immediate: true,
      handler (val) {
        if (val === true) {
          this.snackbar = true;
          this.snackbarColor = "success"
          this.msg = this.loggedMsg;
          this.toggleLoggedInStatus();
        }
      }
    },
    getUser: {
      immediate: true,
      handler (val) {
        console.log(val);
      }
    }
  },

  methods: {
    ...mapActions(['toggleLoggedInStatus'])
  }
}
</script>
