const express = require('express');
const router = express.Router();
const { getHomepage } = require('../controllers/homepage');
const { getAllPosts, addNewPost, fetchSinglePost, updatePost, deletePost } = require('../controllers/posts');
const { adminLogin } = require('../controllers/users');


router.route('/').get(getHomepage);

// Fetch all posts and add new post
router.route('/posts')
      .get(getAllPosts)
      .post(addNewPost);

// Fetch a post, update a post and delete a post
router.route('/posts/:id')
      .get(fetchSinglePost)
      .put(updatePost)
      .delete(deletePost);

// Admin Login
router.route('/admin')
      .post(adminLogin);

module.exports = router;
