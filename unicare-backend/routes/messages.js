const express = require('express');
const router = express.Router();
const { Message } = require('../models');

const messagesController = require('../controllers/messageController');

router.get('/', messagesController.getAllMessages);
router.post('/', messagesController.addMessage);
router.delete('/:id', messagesController.deleteMessage);



// Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Add a new message
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Message.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
