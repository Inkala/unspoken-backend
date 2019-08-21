'use strict';

const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const Like = require('../models/Like');
const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id)
      .populate('likes reactions comments');
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const { username } = req.session.currentUser;
  const message = {
    content: req.body.content,
    owner: username
  };
  try {
    const newMessage = await Message.create(message);
    const messageId = newMessage._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { messages: messageId } });
    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  const message = req.body;
  try {
    const editedMessage = await Message.findByIdAndUpdate(id, message, { new: true });
    res.status(200).json({ editedMessage });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;
  try {
    await Message.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { messages: id } });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/notifications', async (req, res, next) => {
  const { id } = req.params;
  try {
    const seenMessage = await Message.findById(id);
    seenMessage.likes.map(async like => {
      await Like.findByIdAndUpdate(like, { $set: { new: false } }, { new: true });
    });
    seenMessage.reactions.map(async reaction => {
      await Reaction.findByIdAndUpdate(reaction, { $set: { new: false } }, { new: true });
    });
    seenMessage.comments.map(async comment => {
      await Comment.findByIdAndUpdate(comment, { $set: { new: false } }, { new: true });
    });
    res.status(200).json({ seenMessage });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
