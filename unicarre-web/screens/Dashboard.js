import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getUserProfile, submitSymptoms } from '../components/api'; // Import the API functions

const Dashboard = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [description, setDescription] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [hospitalId, setHospitalId] = useState(''); // Add hospitalId state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmitSymptoms = async () => {
    try {
      const symptomsData = { hospitalId, description, additionalMessage };
      await submitSymptoms(symptomsData);
      Alert.alert('Success', 'Symptoms submitted successfully');
      setHospitalId('');
      setDescription('');
      setAdditionalMessage('');
    } catch (error) {
      console.error('Failed to submit symptoms:', error);
      Alert.alert('Error', 'Failed to submit symptoms');
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.profileContainer}>
          <View style={styles.uploadButton}>
            <Text style={styles.uploadText}>+</Text>
          </View>
          <Text style={styles.userId}>ID: {profile.regNumber}</Text>
        </TouchableOpacity>

        {['Messages', 'Emergency Contacts', 'Medical History', 'Settings', 'FAQs', 'Call for Help'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.navigate(item.replace(' ', ''))}>
            <Text style={styles.navText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <TextInput style={styles.searchBar} placeholder="Search for a sickness..." />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.header}>Uni Care Medical Help</Text>
        <Text style={styles.tagline}>Medical help at your fingertips</Text>

        {/* Profile Information */}
        <View style={styles.profileInfo}>
          <Text style={styles.info}>Name: {profile.fullName}</Text>
          <Text style={styles.info}>Email: {profile.email}</Text>
          <Text style={styles.info}>Dorm Room: {profile.dormRoom}</Text>
        </View>

        {/* Submit Symptoms */}
        <Text style={styles.formTitle}>Submit Symptoms</Text>
        <TextInput
          style={styles.input}
          placeholder="Hospital ID"
          value={hospitalId}
          onChangeText={setHospitalId}
        />
        <TextInput
          style={styles.input}
          placeholder="Describe your symptoms here..."
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Additional message (optional)..."
          multiline
          value={additionalMessage}
          onChangeText={setAdditionalMessage}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitSymptoms}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Health Tip */}
      <View style={styles.healthTip}>
        <Text style={styles.healthTipTitle}>Health Tip</Text>
        <Text style={styles.healthTipText}>Get enough sleep to allow your body to rest and recover.</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.contactUs}>Contact Us</Text>
        <View style={styles.socialMedia}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/princeevans379')}>
            <FontAwesomeIcon icon={faInstagram} size={30} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/Evans Prince')}>
            <FontAwesomeIcon icon={faFacebook} size={30} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+263712172407')}>
            <FontAwesomeIcon icon={faWhatsapp} size={30} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1 },
  sidebar: {
    width: '30%',
    backgroundColor: '#ececec',
    padding: 10,
  },
  profileContainer: { alignItems: 'center', marginBottom: 20 },
  uploadButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: { fontSize: 24, color: '#555' },
  userId: { marginTop: 10, fontWeight: 'bold' },
  navButton: { backgroundColor: '#900', padding: 10, marginVertical: 5, borderRadius: 5 },
  navText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginVertical: 10 },
  submitButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginVertical: 10 },
  submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  mainContent: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tagline: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  profileInfo: { marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 5 },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  healthTip: { padding: 20, backgroundColor: '#e0f7fa', margin: 20, borderRadius: 10 },
  healthTipTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  healthTipText: { fontSize: 16 },
  footer: { alignItems: 'center', marginTop: 20 },
  contactUs: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  socialMedia: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  socialIcon: { color: '#000' },
});

export default Dashboard;
