var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String,
  createdAt: Date
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
