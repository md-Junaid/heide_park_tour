<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link> |
            <a href="#" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
    <commonSnackBar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonSnackBar from '@/components/common/commonSnackBar';

export default {
  name: 'posts',

  components: {
    commonSnackBar
  },

  data () {
    return {
      posts: []
    }
  },

  mounted () {
    this.fetchAllPosts();
  },

  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getAllPosts: 'getAllPosts'
    })
  },

  watch: {
    getAllPosts: {
      immediate: true,
      handler (val) {
        this.posts = val;
      }
    }
  },

  methods: {
    ...mapActions(['fetchAllPosts', 'deletePostAction']),
    deletePost (id) {
      this.deletePostAction(id);
      this.$router.go();
      this.fetchAllPosts();
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
