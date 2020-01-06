<template>
<v-content class="my-grad">
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
        md6
        lg4
        xl2
      >
      <v-img class="ml-2 mb-5" width="500"  :src="require('@/assets/HPTlogo.png')"></v-img>
        <v-card
          width="500"
          style="border-radius: 15px;"
          class="elevation-8"
        >
          <v-toolbar
            color="#1DC690"
            dark
            flat
          >
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Username"
                name="login"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
                :error="required"
                type="text"
                :value="username"
                @keydown.enter="submit"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :type="show1 ? 'text' : 'password'"
                :rules="[rules.required]"
                :error="required"
                @keydown.enter="submit"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="twoFac"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                label="Two Factor Authentication Code"
                name="code"
                prepend-icon="mdi-two-factor-authentication"
                :rules="[rules.required]"
                :type="show2 ? 'text' : 'password'"
                :error="required"
                @keydown.enter="submit"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              width="60%"
              rounded
              x-large
              color="#1C4670"
              dark
              class="mb-5"
              @click="submit"
              style="-webkit-box-shadow: 1px 1px 15px 1px rgba(28, 70, 112,0.75);
                      -moz-box-shadow: 1px 1px 15px 1px rgba(28, 70, 112,0.75);
                      box-shadow: 1px 1px 15px 1px rgba(28, 70, 112,0.75);"
            >
              Login
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
</v-content>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data () {
    return {
      username: null,
      password: null,
      show1: false,
      show2: false,
      twoFac: null,
      msg: null,
      snackbarColor: null,
      timeout: 5000,
      snackbar: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      required: false
    }
  },

  methods: {
    ...mapActions(['adminLogin']),

    async submit () {
      const user = {
        username: this.username,
        password: this.password,
        twoFac: this.twoFac
      };
      if (this.username && this.password && this.twoFac) {
        const res = await this.adminLogin(user);
        console.log(res)
        if (res.loggedIn) {
          this.snackbar = true;
          this.msg = res.msg;
          this.snackbarColor = "success";
          this.$router.push({ name: 'HomePage' });
        } else {
          this.snackbar = true;
          this.msg = res.msg;
          this.snackbarColor = "error";
          if (res.type === "2Fac") {
            this.twoFac = null;
          } else {
            this.username = null;
            this.password = null;
            this.twoFac = null;
          }
        }
        this.required = false;
      } else {
        this.required = true;
      }
    }
  },

  watch: {
    // getUser () {
    //   console.log("ITs working")
    //   console.log(this.getUser);
    // }
  }
}
</script>
