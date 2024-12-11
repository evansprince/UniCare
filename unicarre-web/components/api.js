import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for React Native

// Set the base URL for your API
const API_URL = 'http://localhost:5000'; // Adjusted to your backend URL

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Add interceptors for debugging
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // Get the token from AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Axios Request Config:', config);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error.message);
    if (error.response) {
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
    } else if (error.request) {
      console.log('Request Details:', error.request);
    }
    return Promise.reject(error);
  }
);

// Function to sign up a user
export const signUp = async (formData) => {
  try {
    const response = await apiClient.post('/api/users/register', formData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error.response?.data || error.message);
    throw error;
  }
};

// Function to log in a user and store the token
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/users/login', credentials);
    const token = response.data.token;
    await AsyncStorage.setItem('token', token); // Store the token in AsyncStorage
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get all messages
export const getMessages = async () => {
  try {
    const response = await apiClient.get('/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error.response?.data || error.message);
    throw error;
  }
};

// Function to add a message
export const addMessage = async (messageData) => {
  try {
    const response = await apiClient.post('/messages', messageData);
    return response.data;
  } catch (error) {
    console.error('Error adding message:', error.response?.data || error.message);
    throw error;
  }
};

// Function to delete a message
export const deleteMessage = async (messageId) => {
  try {
    await apiClient.delete(`/messages/${messageId}`);
  } catch (error) {
    console.error('Error deleting message:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get all emergency contacts
export const getEmergencyContacts = async () => {
  try {
    const response = await apiClient.get('/emergencyContacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching emergency contacts:', error.response?.data || error.message);
    throw error;
  }
};

// Function to add an emergency contact
export const addEmergencyContact = async (contactData) => {
  try {
    const response = await apiClient.post('/emergencyContacts', contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding emergency contact:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update an emergency contact
export const updateEmergencyContact = async (contactId, contactData) => {
  try {
    const response = await apiClient.put(`/emergencyContacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error updating emergency contact:', error.response?.data || error.message);
    throw error;
  }
};

// Function to delete an emergency contact
export const deleteEmergencyContact = async (contactId) => {
  try {
    await apiClient.delete(`/emergencyContacts/${contactId}`);
  } catch (error) {
    console.error('Error deleting emergency contact:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get all medical history records
export const getMedicalHistory = async () => {
  try {
    const response = await apiClient.get('/medicalHistory');
    return response.data;
  } catch (error) {
    console.error('Error fetching medical history:', error.response?.data || error.message);
    throw error;
  }
};

// Function to add a medical history record
export const addMedicalHistory = async (historyData) => {
  try {
    const response = await apiClient.post('/medicalHistory', historyData);
    return response.data;
  } catch (error) {
    console.error('Error adding medical history record:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update a medical history record
export const updateMedicalHistory = async (historyId, historyData) => {
  try {
    const response = await apiClient.put(`/medicalHistory/${historyId}`, historyData);
    return response.data;
  } catch (error) {
    console.error('Error updating medical history record:', error.response?.data || error.message);
    throw error;
  }
};

// Function to delete a medical history record
export const deleteMedicalHistory = async (historyId) => {
  try {
    await apiClient.delete(`/medicalHistory/${historyId}`);
  } catch (error) {
    console.error('Error deleting medical history record:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/api/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error;
  }
};

// Function to change password
export const changePassword = async (passwordData) => {
  try {
    const response = await apiClient.put('/api/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error.response?.data || error.message);
    throw error;
  }
};
// Function to submit symptoms (emergency request)
export const submitSymptoms = async (symptomsData) => {
  try {
    const response = await apiClient.post('/api/emergencies/create', symptomsData);
    return response.data;
  } catch (error) {
    console.error('Error submitting symptoms:', error.response?.data || error.message);
    throw error;
  }
};

export default apiClient;
