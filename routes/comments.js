'use strict';

const express = require('express');
const Comment = require('../models/Comment');
const Message = require('../models/Message');
const router = express.Router();

router.post('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({ content });
    await Message.findByIdAndUpdate(messageId, { $push: { comments: comment._id } });
    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
