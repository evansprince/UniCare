const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to req.user
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;