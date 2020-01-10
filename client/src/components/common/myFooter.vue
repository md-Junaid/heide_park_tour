<template>
  <v-container fluid style="background-color:#f5dea3">
    <v-row :style="$vuetify.breakpoint.mdAndUp ? 'width:800px; margin:0 auto;' : ''">
        <v-col class="font-weight-bold"><a :to="'/about'"> About </a></v-col>
        <v-col class="font-weight-bold" :to="'/contact'"><a :to="'/about'"> Contact Us </a></v-col>
        <v-col class="font-weight-bold" :to="'/faqs'"><a :to="'/about'"> FAQ's </a></v-col>
    </v-row>
    <p
      class="font-weight-medium custom-font text-center mb-0 mt-3"
      :style="$vuetify.breakpoint.xsOnly ? 'font-size: 12px !important' : ''"
    >
      Copyright © 2019 DEJV Team. All rights reserved.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'myFooter'
}
</script>
