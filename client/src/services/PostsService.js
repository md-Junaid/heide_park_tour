import Api from '@/services/Api';

export default {
  fetchPosts (token) {
    return Api().get('posts');
  },

  addPost (params, token) {
    return Api().post('posts', params);
  },

  updatePost (params, token) {
    return Api().put('posts/' + params.id, params);
  },

  getPost (params, token) {
    return Api().get('posts/' + params.id);
  },

  deletePost (id, token) {
    return Api().delete('posts/' + id);
  },

  login (params) {
    return Api().post('admin', params);
  }
};
