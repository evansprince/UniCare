const { EmergencyRequest } = require('../models'); // Adjust import for EmergencyRequest
const { User } = require('../models'); // Adjust import for User
const { Hospital } = require('../models'); // Adjust import for Hospital

// Utility function to handle errors
const handleError = (res, err, statusCode = 500) => {
  console.error(err); // Log the error
  res.status(statusCode).json({ error: err.message });
};

// Create Emergency Request
exports.createEmergencyRequest = async (req, res) => {
  const { hospitalId, description } = req.body;

  if (!hospitalId || !description) {
    return res.status(400).json({ message: 'Hospital ID and description are required.' });
  }

  try {
    const emergencyRequest = await EmergencyRequest.create({
      userId: req.user.id,
      hospitalId,
      description,
    });
    res.status(201).json({ message: 'Emergency request created', emergencyRequest });
  } catch (err) {
    handleError(res, err, 400);
  }
};

// Get Emergency Requests
exports.getEmergencyRequests = async (req, res) => {
  try {
    const emergencyRequests = await EmergencyRequest.findAll({
      where: { userId: req.user.id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Hospital, as: 'hospital', attributes: ['id', 'name', 'location'] },
      ],
    });
    res.json(emergencyRequests);
  } catch (err) {
    handleError(res, err);
  }
};

// Update Emergency Request Status
exports.updateEmergencyRequestStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'approved', 'rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
  }

  try {
    const emergencyRequest = await EmergencyRequest.findByPk(req.params.id);
    if (!emergencyRequest) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }

    emergencyRequest.status = status;
    await emergencyRequest.save();

    res.json({ message: 'Status updated', emergencyRequest });
  } catch (err) {
    handleError(res, err);
  }
};
