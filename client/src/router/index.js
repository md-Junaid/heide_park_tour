import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage';
import Posts from '@/views/Posts';
import NewPost from '@/components/posts/NewPost';
import EditPost from '@/components/posts/EditPost';
import Login from '@/views/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/admin',
      name: 'Login',
      component: Login
    }
  ]
});
