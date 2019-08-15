'use strict';

const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const message = req.body;
  try {
    const newMessage = await Message.create(message);
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
