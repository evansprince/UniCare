import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, ImageBackground, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { login } from '../components/api'; // Import the login function from api.js

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Change email to username
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when starting the request

    try {
      const credentials = { regNumber: username, password }; // Send regNumber as username
      const response = await login(credentials); // Call login API function from api.js
      console.log(response); // Log the response (e.g., token or user data)

      // If login is successful, navigate to the Dashboard screen
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error); // Log the error

      // Show error message in case of login failure
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/home.jpg')} style={styles.background}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username (Reg Number)"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            // Show loading spinner while the request is in progress
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Login" onPress={handleLogin} />
          )}

          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
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
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
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
    borderRadius: 5,
  },
});

export default Login;
