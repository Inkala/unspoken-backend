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
  ]
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
