'use strict';

const express = require('express');
const Reaction = require('../models/Reaction');
const Message = require('../models/Message');
const router = express.Router();

router.post('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;
  try {
    const reaction = await Reaction.create({});
    await Message.findByIdAndUpdate(messageId, { $push: { reactions: reaction._id } });
    res.status(200).json({ reaction });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
