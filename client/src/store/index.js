import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import posts from './modules/posts';
import commonSnackBar from './modules/commonSnackBar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    posts,
    commonSnackBar
  },
  plugins: [createPersistedState()]
});
