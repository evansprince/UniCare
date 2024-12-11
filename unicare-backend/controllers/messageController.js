const { Message } = require('../models');

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add message' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = {
  getAllMessages,
  addMessage,
  deleteMessage,
};
