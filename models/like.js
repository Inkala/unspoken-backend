'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const likeSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  new: {
    type: Boolean,
    default: true
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
