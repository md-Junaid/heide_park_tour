const express = require('express');
const router = express.Router();
const { getHomepage } = require('../controllers/homepage');
const { getAllPosts, addNewPost, fetchSinglePost, updatePost, deletePost } = require('../controllers/posts');


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
router.post('/admin', (req, res) => {
  console.log("received in backend", req.body);
  res.send({
    success: true
  });
});

module.exports = router;
