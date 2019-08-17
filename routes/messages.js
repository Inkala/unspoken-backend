'use strict';

const express = require('express');
const Message = require('../models/Message.js');
const User = require('../models/User.js');
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
    const message = await Message.findById(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const message = req.body;
  try {
    const newMessage = await Message.create(message);
    const messageId = newMessage._id;
    console.log('<<< MessageId >>>', messageId);
    const userId = req.session.currentUser._id;
    console.log('<<< UserId >>>', userId);
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
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
