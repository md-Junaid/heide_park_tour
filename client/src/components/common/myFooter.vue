<template>
  <v-container fluid style="background-color:#494949;color: white;" class="text-center">
    <v-row :style="$vuetify.breakpoint.mdAndUp ? 'width:800px; margin:0 auto;' : ''">
        <v-col class="font-weight-bold"><v-btn color="blue" text disabled :to="'/about'"> About </v-btn></v-col>
        <v-col class="font-weight-bold"><v-btn color="blue" text disabled :to="'/contact'"> Contact Us </v-btn></v-col>
        <v-col class="font-weight-bold"><v-btn color="blue" text disabled :to="'/faq'"> FAQ's </v-btn></v-col>
        <v-col class="font-weight-bold"><v-btn color="blue" text :disabled="disable" :to="'/admin'">Admin Login</v-btn></v-col>
    </v-row>
    <p
      class="font-weight-medium custom-font text-center mb-0 mt-3"
      style="color: #a5e69d;"
      :style="$vuetify.breakpoint.xsOnly ? 'font-size: 12px !important' : ''"
    >
      Copyright © 2019 DEJV Team. All rights reserved.
    </p>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'myFooter',

  data () {
    return {
      disable: false
    }
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  },

  watch: {
    getUser: {
      immediate: true,
      handler (value) {
        if (value.token) {
          this.disable = true;
        }
      }
    }
  }
}
</script>
