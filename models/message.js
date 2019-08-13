'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      type: ObjectId,
      ref: 'Like'
    }
  ],
  reactions: [
    {
      type: ObjectId,
      ref: 'Reaction'
    }
  ],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ]
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
