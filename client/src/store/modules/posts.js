import PostsService from '@/services/PostsService';

const state = {
  posts: [],
  currentPost: {
    title: null,
    description: null
  }
};

const getters = {
  getAllPosts: (state) => state.posts,
  getCurrentPost: (state) => state.currentPost
};

const mutations = {
  mutateFetchAllPosts: (state, posts) => {
    state.posts = posts;
  },
  mutateFetchCurrentPost: (state, currentPost) => {
    state.currentPost = currentPost;
  }
};

const actions = {

  // @desc Fetch all posts
  // @method GET
  // @access Public
  async fetchAllPosts ({ commit, rootGetters }) {
    const token = rootGetters.getUser.token;
    const response = await PostsService.fetchPosts(token);
    const posts = response.data.posts;
    commit('mutateFetchAllPosts', posts);
  },

  // @desc Fetch current post clicked on
  // @method GET
  // @access Public
  async fetchCurrentPost ({ commit, rootGetters }, id) {
    const token = rootGetters.getUser.token;
    const response = await PostsService.getPost({
      id: id
    }, token);
    const currentPost = {
      title: response.data.title,
      description: response.data.description
    };
    commit('mutateFetchCurrentPost', currentPost);
  },

  // @desc Add a new post
  // @method POST
  // @access Admin
  async addNewPost ({ rootGetters }, {title, description}) {
    const params = {
      title,
      description
    };
    const token = rootGetters.getUser.token;
    await PostsService.addPost(params, token);
  },

  // @desc Update current post clicked on
  // @method PUT
  // @access Admin
  async updateCurrentPost ({ commit, rootGetters }, params) {
    const token = rootGetters.getUser.token;
    const res = await PostsService.updatePost(params, token);
    return res.data.success;
  },

  // @desc Delete a post
  // @method DELETE
  // @access Admin
  async deletePostAction ({ commit, rootGetters }, id) {
    const token = rootGetters.getUser.token;
    await PostsService.deletePost(id, token);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
