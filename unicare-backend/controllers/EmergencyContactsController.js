const { EmergencyContact } = require('../models');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const addContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await EmergencyContact.update(req.body, { where: { id } });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await EmergencyContact.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
};
