import PostsService from '@/services/PostsService';

const state = {
  user: {
    userId: null,
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
  mutateToggleLoggedStatus: (state) => {
    state.loggedIn = false;
  },
  mutateUpdateToken: (state, currentUser) => {
    state.user = currentUser;
  }
};

const actions = {
  async adminLogin ({ commit }, user) {
    const response = await PostsService.login(user);
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
      const currentUser = {
        userId: response.data.id,
        username: user.username,
        token: response.data.token
      };
      // localStorage.setItem('token', response.data.token);
      commit('mutateUpdateToken', currentUser);
      state.loggedIn = true;
      return res;
    }
  },

  toggleLoggedInStatus ({ commit }) {
    commit('mutateToggleLoggedStatus');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
