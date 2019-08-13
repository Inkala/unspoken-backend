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
    type: Boolean
  }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
