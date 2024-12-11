import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { signUp } from '../components/api.js'; // Import the signUp function from api.js

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    dormRoom: '',
    email: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading

    // Basic validation
    if (!formData.email || !formData.password) {
      Alert.alert('Validation Error', 'Email and Password are required.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const result = await signUp(formData); // Call signUp API function
      console.log(result); // Log the response
      navigation.navigate('Login'); // Navigate on success
    } catch (error) {
      console.error('Error during sign up:', error); // Handle error
      Alert.alert('Sign Up Failed', 'An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/home.jpg')} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.header}>Sign Up</Text>
              {[
                'fullName',
                'regNumber',
                'dormRoom',
                'email',
                'medicalHistory',
                'allergies',
                'emergencyContact',
                'password',
              ].map((field, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={formData[field]}
                  onChangeText={(text) => handleChange(field, text)}
                  secureTextEntry={field === 'password'}
                />
              ))}

              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button title="Sign Up" onPress={handleSubmit} />
              )}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? Log in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400, // Limit max width for larger screens
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  loginLink: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
