import PostsService from '@/services/PostsService';

const state = {
  user: {
    username: null,
    token: null
  },
  loggedIn: false,
  loggedInMsg: "Admin successfully logged in"
};

const getters = {
  getUser: (state) => state.user,
  getLoggedInStatus: (state) => state.loggedIn,
  getLoggedInMsg: (state) => state.loggedInMsg
};

const mutations = {
  setUser: (state, user) => {
    state.user.username = user.username;
  },
  MutateToggleLoggedStatus: (state) => {
    state.loggedIn = false;
  }
};

const actions = {
  async adminLogin ({ commit }, user) {
    const response = await PostsService.login(user);
    console.log("response from server: ", response.data);
    commit('setUser', user);
    if (response.data.code === 403) {
      const res = {
        loggedIn: false,
        type: response.data.type,
        msg: response.data.msg
      };
      return res;
    } else {
      const res = {
        loggedIn: true,
        msg: response.data.msg
      };
      state.loggedIn = true;
      return res;
    }
  },

  toggleLoggedInStatus ({ commit }) {
    commit('MutateToggleLoggedStatus');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
