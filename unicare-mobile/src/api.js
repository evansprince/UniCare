import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Register API
export const registerUser = async (fullName, regNumber, dormRoom, email, password, medicalHistory, allergies, emergencyContact) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, { fullName, regNumber, dormRoom, email, password, medicalHistory, allergies, emergencyContact });
    return response.data; // Assuming response contains a success message
  } catch (error) {
    console.error('Registration failed:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Login API
export const loginUser = async (regNumber, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { regNumber, password });
    return response.data; // Assuming response contains user data or token
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Get Profile API 
export const getProfile = async (token) => { 
  try { 
    const response = await axios.get(`${API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } }); return response.data; } catch (error) { console.error('Error fetching profile data:', error); throw error; } };

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const profileData = await getProfile(token);
    console.log('Profile Data:', profileData); // Log the profile data
    setProfile(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};
