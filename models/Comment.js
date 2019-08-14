'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  new: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
