const Post = require('../models/post');

// @desc Get all posts
// @route GET
// @access Public
exports.getAllPosts = async (req, res, next) => {
  try {
    Post.find({}, 'title description', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      });
    }).sort({_id:-1});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};

// @desc Add new post
// @route POST
// @access Public
exports.addNewPost = async (req, res, next) => {
  try {
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
      title: title,
      description: description
    });
    new_post.save(function (error) {
      if (error) {
        console.log(error);
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};

// @desc Get single post
// @route GET
// @access Public
exports.fetchSinglePost = async (req, res, next) => {
  try {
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
      res.send(post);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};

// @desc UPDATE single post
// @route PUT
// @access Public
exports.updatePost = async (req, res, next) => {
  try {
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
  
      post.title = req.body.title;
      post.description = req.body.description;
      post.save(function (error) {
        if (error) {
          console.log(error);
          res.send({
            success: false
          });
        }
        res.send({
          success: true
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};

// @desc DELETE single post
// @route DELETE
// @access Public
exports.deletePost = async (req, res, next) => {
  try {
    Post.remove({
      _id: req.params.id
    }, function(err, post){
      if (err)
        res.send(err);
      res.send({
        success: true
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};
