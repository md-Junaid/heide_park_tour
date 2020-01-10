<template>
  <div>
    <carousel
      :style="$vuetify.breakpoint.smAndUp ? 'clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 51.5% 95%, 50% 100%, 48.5% 95%, 0 95%);' : ''"
    />
    <welcomeInfo />
    <mainMap />
  <commonSnackBar  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import carousel from '@/components/homepage/carousel';
import welcomeInfo from '@/components/homepage/welcomeInfo';
import mainMap from '@/components/homepage/mainMap';
import commonSnackBar from '@/components/common/commonSnackBar';

export default {
  name: 'HomePage',

  components: {
    carousel,
    welcomeInfo,
    mainMap,
    commonSnackBar
  },

  mounted () {
    console.log(process.env.ROOT_API)
    console.log("this is port: ", process.env.PORT)
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
          const params = {
            snackbar: true,
            snackbarColor: "success",
            msg: this.loggedMsg
          };
          this.toggleSnackBar(params);
          this.toggleLoggedInStatus();
        }
      }
    }
  },

  methods: {
    ...mapActions(['toggleLoggedInStatus', 'toggleSnackBar'])
  }
}
</script>
