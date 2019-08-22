'use strict';

const express = require('express');
const Reaction = require('../models/Reaction');
const Message = require('../models/Message');
const router = express.Router();

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/:messageId', isLoggedIn(), async (req, res, next) => {
  const { messageId } = req.params;
  const userId = req.session.currentUser._id;
  try {
    const reaction = await Reaction.create({ userId });
    await Message.findByIdAndUpdate(messageId, { $push: { reactions: reaction._id } });
    res.status(200).json({ reaction });
  } catch (error) {
    next(error);
  }
});

router.delete('/:reactionId/:messageId/delete', isLoggedIn(), async (req, res, next) => {
  const { reactionId, messageId } = req.params;
  try {
    await Reaction.findByIdAndDelete(reactionId);
    await Message.findByIdAndUpdate(messageId, { $pull: { reactions: reactionId } });
    res.status(200).json({ message: 'reaction removed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
