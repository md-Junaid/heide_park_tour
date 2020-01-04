import PostsService from '@/services/PostsService';

const state = {
  user: {
    login: null,
    password: null,
    twoFac: null
  }
};

const getters = {
  getUser: (state) => state.user
};

const mutations = {
  setUser: (state, user) => (state.user = user)
};

const actions = {
  async adminLogin ({ commit }, user) {
    const response = await PostsService.login(user);
    console.log('Actions called in store!!', response);
    commit('setUser', user);
    if (response.data.success === true) {
      return true;
    } else {
      return false;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
