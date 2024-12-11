const { MedicalHistory } = require('../models');

const getAllHistory = async (req, res) => {
  try {
    const history = await MedicalHistory.findAll();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medical history' });
  }
};

const addHistory = async (req, res) => {
  try {
    const record = await MedicalHistory.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add medical history record' });
  }
};

const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalHistory.update(req.body, { where: { id } });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medical history record' });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicalHistory.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medical history record' });
  }
};

module.exports = {
  getAllHistory,
  addHistory,
  updateHistory,
  deleteHistory,
};
