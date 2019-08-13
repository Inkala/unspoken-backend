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

module.exports = router;
