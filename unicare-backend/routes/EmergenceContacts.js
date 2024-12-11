const express = require('express');
const router = express.Router();
const { EmergencyContact } = require('../models');

const emergencyContactsController = require('../controllers/EmergencyContactsController');

router.get('/', emergencyContactsController.getAllContacts);
router.post('/', emergencyContactsController.addContact);
router.put('/:id', emergencyContactsController.updateContact);
router.delete('/:id', emergencyContactsController.deleteContact);



// Fetch all emergency contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await EmergencyContact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Add a new emergency contact
router.post('/', async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

// Edit an emergency contact
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await EmergencyContact.update(req.body, { where: { id } });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete an emergency contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await EmergencyContact.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
