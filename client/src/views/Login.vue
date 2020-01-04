<template>
<v-content>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card width="500" style="border-radius: 15px;" class="elevation-8">
          <v-toolbar
            color="my-grad"
            dark
            flat
          >
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="login"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="twoFac"
                label="Two Factor Authentication Code"
                name="code"
                prepend-icon="mdi-two-factor-authentication"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn width="60%" rounded x-large color="#1DC690" dark class="mb-5">Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      login: null,
      password: null,
      twoFac: null
    }
  }

  // watch: {
  //   login () {
  //     console.log(this.login)
  //   }
  // }
}
</script>
