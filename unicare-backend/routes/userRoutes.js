const express = require('express');
const { register, login, getProfile, updateUserProfile, changePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', (req, res) => {
  console.log('Login attempt received:', req.body); // Add logging
  login(req, res);
});

// Route for getting user profile (requires authentication)
router.get('/profile', authMiddleware, (req, res) => {
  console.log('Headers:', req.headers);
  getProfile(req, res);
});

// Route for updating user profile (requires authentication)
router.put('/profile', authMiddleware, updateUserProfile);

// Route for changing password (requires authentication)
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
