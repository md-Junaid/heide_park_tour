const express = require('express');
const router = express.Router();
const { getHomepage, updateWelcomeHeadline } = require('../controllers/homepage');
const { getAllPosts, addNewPost, fetchSinglePost, updatePost, deletePost } = require('../controllers/posts');
const { adminLogin, verifyToken } = require('../controllers/users');


router.route('/').get(getHomepage);

// Fetch all posts and add new post
router.route('/posts')
      .get(getAllPosts)
      .post(verifyToken, addNewPost);

// Fetch a post, update a post and delete a post
router.route('/posts/:id')
      .get(fetchSinglePost)
      .put(verifyToken, updatePost)
      .delete(verifyToken, deletePost);

// Admin Login
router.route('/admin')
      .post(adminLogin);

// Homepage routes
router.route('/headline/:id')
      .put(verifyToken, updateWelcomeHeadline);

module.exports = router;
