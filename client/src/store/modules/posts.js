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
  async fetchAllPosts ({ commit }) {
    const response = await PostsService.fetchPosts();
    const posts = response.data.posts;
    commit('mutateFetchAllPosts', posts);
  },

  // @desc Fetch current post clicked on
  // @method GET
  // @access Public
  async fetchCurrentPost ({ commit }, id) {
    const response = await PostsService.getPost({ id: id });
    const currentPost = {
      title: response.data.title,
      description: response.data.description
    };
    commit('mutateFetchCurrentPost', currentPost);
  },

  // @desc Add a new post
  // @method POST
  // @access Admin
  async addNewPost ({_}, {title, description}) {
    const params = {
      title,
      description
    };
    const res = await PostsService.addPost(params);
    console.log(res);
  },

  // @desc Update current post clicked on
  // @method PUT
  // @access Admin
  async updateCurrentPost ({_}, params) {
    const res = await PostsService.updatePost(params);
    return res.data.success;
  },

  // @desc Delete a post
  // @method DELETE
  // @access Admin
  async deletePostAction ({_}, id) {
    await PostsService.deletePost(id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
