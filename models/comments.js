'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;