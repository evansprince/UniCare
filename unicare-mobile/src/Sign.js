import React, { useState } from 'react';
import './Sign.css';
import { registerUser, loginUser } from './api.js';
import { useNavigate } from 'react-router-dom';

const Name = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    dormRoom: '',
    email: '',
    username: '',
    password: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const response = await registerUser(formData.fullName, formData.regNumber, formData.dormRoom, formData.email, formData.password, formData.medicalHistory, formData.allergies, formData.emergencyContact);
        setSuccessMessage(response.message);
      } else {
        const response = await loginUser(formData.username, formData.password);
        setSuccessMessage('Login successful!');
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      }
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="name-container">
      <div className="name-box">
        <h1 className='h1SignIn'>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="input-field"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="regNumber"
                placeholder="Reg Number"
                className="input-field"
                value={formData.regNumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="dormRoom"
                placeholder="Dorm and Room Number"
                className="input-field"
                value={formData.dormRoom}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="medicalHistory"
                placeholder="Medical History"
                className="input-field"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
              <input
                type="text"
                name="allergies"
                placeholder="Allergies"
                className="input-field"
                value={formData.allergies}
                onChange={handleChange}
              />
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                className="input-field"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </>
          )}
          {!isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-field"
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (isSignUp ? 'Signing Up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
        <p className="signup-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"} <a href="#" className="signup-link" onClick={toggleForm}>{isSignUp ? 'Login' : 'Sign Up'}</a>
        </p>
      </div>
    </div>
  );
};

export default Name;
