const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const emergenceRoutes = require('./routes/emergenceRoutes');
const messagesRouter = require('./routes/messages');
const emergencyContactsRouter = require('./routes/emergenceContacts'); 
const medicalHistoryRouter = require('./routes/MedicalHistory');

dotenv.config();

// Ensure required environment variables are set
if (!process.env.JWT_SECRET || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Missing required environment variables. Please check your .env file.');
}

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/emergencies', emergenceRoutes);
app.use('/messages', messagesRouter); 
app.use('/emergencyContacts', emergencyContactsRouter); 
app.use('/medicalHistory', medicalHistoryRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000; // Change to a different port, e.g., 3000

sequelize
  .sync({ alter: true }) // For development: Use { alter: true } or { force: true } cautiously
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));
