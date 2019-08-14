'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reactionSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
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

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
