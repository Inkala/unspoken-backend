'use strict';

const express = require('express');
const Like = require('../models/Like.js');
const Message = require('../models/Message.js');
const router = express.Router();

router.post('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;
  try {
    const like = await Like.create({});
    await Message.findByIdAndUpdate(messageId, { $push: { likes: like._id } });
    res.status(200).json({ like });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
