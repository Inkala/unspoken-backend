'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'love',
      'hate',
      'nostalgia',
      'family',
      'friendship',
      'other'
    ]
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
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
