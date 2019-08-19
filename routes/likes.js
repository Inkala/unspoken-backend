'use strict';

const express = require('express');
const Like = require('../models/Like');
const Message = require('../models/Message');
const router = express.Router();

router.post('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;
  const userId = req.session.currentUser._id;
  try {
    const like = await Like.create({ userId });
    await Message.findByIdAndUpdate(messageId, { $push: { likes: like._id } });
    res.status(200).json({ like });
  } catch (error) {
    next(error);
  }
});

router.delete('/:likeId/:messageId/delete', async (req, res, next) => {
  const { likeId, messageId } = req.params;
  try {
    await Like.findByIdAndDelete(likeId);
    await Message.findByIdAndUpdate(messageId, { $pull: { likes: likeId } });
    res.status(200).json({ message: 'like removed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
