const express = require('express');
const { createEmergencyRequest, getEmergencyRequests, updateEmergencyRequestStatus } = require('../controllers/emergencyController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Route for creating an emergency request (requires authentication)
router.post('/create', authMiddleware, createEmergencyRequest);

// Route for getting all emergency requests (requires authentication)
router.get('/requests', authMiddleware, getEmergencyRequests);

// Route for updating emergency request status (requires authentication)
router.put('/update/:id', authMiddleware, updateEmergencyRequestStatus);

module.exports = router;
