import Api from '@/services/Api';

export default {
  fetchPosts (token) {
    return Api().get('api/posts', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  },

  addPost (params, token) {
    return Api().post('api/posts', params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  },

  updatePost (params, token) {
    return Api().put('api/posts/' + params.id, params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  },

  getPost (params, token) {
    return Api().get('api/posts/' + params.id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  },

  deletePost (id, token) {
    return Api().delete('api/posts/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  },

  login (params) {
    return Api().post('api/admin', params);
  }
};
