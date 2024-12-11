import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Register API
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, { username, password });
    return response.data; // Assuming response contains a success message
  } catch (error) {
    console.error('Registration failed:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};
