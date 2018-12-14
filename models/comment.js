const mongoose = require('mongoose');
const Post = require('../models/post')
const schema = mongoose.schema;

const commentSchema = {

    name: String,
    description: String,
    postId: { type: String, ref: 'Post' }
}

module.exports = mongoose.model('Comment', commentSchema);