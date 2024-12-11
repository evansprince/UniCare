const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');  // Correct import here

// Validation schema for registration
const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  regNumber: Joi.string().required(),
  dormRoom: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  medicalHistory: Joi.string().allow(null, ''),
  allergies: Joi.string().allow(null, ''),
  emergencyContact: Joi.string().required(),
});

const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.user.id; // Assuming you have user ID from authentication middleware

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.fullName = fullName;
    user.email = email;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // Assuming you have user ID from authentication middleware

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Failed to change password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

const register = async (req, res) => {
  // Validate the incoming request body using Joi
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { fullName, regNumber, dormRoom, email, password, medicalHistory, allergies, emergencyContact } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({ fullName, regNumber, dormRoom, email, password: hashedPassword, medicalHistory, allergies, emergencyContact });

    // Exclude the password from the response
    user.password = undefined;

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

const login = async (req, res) => {
  const { regNumber, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { regNumber } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

const getProfile = async (req, res) => {
  try {
    // Assuming user information is attached to req.user by JWT middleware
    const user = await User.findByPk(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Exclude the password from the response
    user.password = undefined;

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateUserProfile,
  changePassword,
};
