import PostsService from '@/services/PostsService';
import router from '../../router/index';

const state = {
  headlineObj: {
    id: null,
    headline: ''
  }
};

const getters = {
  getHeadline: (state) => state.headlineObj
};

const mutations = {
  mutateFetchHeadline: (state, headline) => {
    state.headlineObj = headline;
  }
};

const actions = {

  // @desc Fetch entire homepage
  // @method GET
  // @access Public
  async fetchHomepage ({ commit }) {
    const response = await PostsService.getHomepage();
    const headline = response.data.headline[0];
    commit('mutateFetchHeadline', headline);
  },

  async setHeadlineText ({ commit }, { id, headline }) {
    const response = await PostsService.setHeadline({ id, headline });
    if (response.data.success === true) {
      router.go();
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
