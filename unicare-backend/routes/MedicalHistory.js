const express = require('express');
const router = express.Router();
const { MedicalHistory } = require('../models');


const medicalHistoryController = require('../controllers/MedicalHistoryController');

router.get('/', medicalHistoryController.getAllHistory);
router.post('/', medicalHistoryController.addHistory);
router.put('/:id', medicalHistoryController.updateHistory);
router.delete('/:id', medicalHistoryController.deleteHistory);

// Fetch all medical history records
router.get('/', async (req, res) => {
  try {
    const history = await MedicalHistory.findAll();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medical history' });
  }
});

// Add a new medical history record
router.post('/', async (req, res) => {
  try {
    const record = await MedicalHistory.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add medical history record' });
  }
});

// Edit a medical history record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalHistory.update(req.body, { where: { id } });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medical history record' });
  }
});

// Delete a medical history record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await MedicalHistory.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medical history record' });
  }
});

module.exports = router;
