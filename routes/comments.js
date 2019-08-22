'use strict';

const express = require('express');
const Comment = require('../models/Comment');
const Message = require('../models/Message');
const router = express.Router();

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/:messageId/new', isLoggedIn(), async (req, res, next) => {
  const { username } = req.session.currentUser;
  const { messageId } = req.params;
  const { newComment } = req.body;
  try {
    const comment = await Comment.create({ owner: username, content: newComment });
    await Message.findByIdAndUpdate(messageId, { $push: { comments: comment._id } });
    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
