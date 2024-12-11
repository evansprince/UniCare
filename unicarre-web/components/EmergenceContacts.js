import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getEmergencyContacts, addEmergencyContact, deleteEmergencyContact } from './api'; // Import the API functions

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getEmergencyContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch emergency contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    try {
      const newContact = { regNumber: 'R123456', name, phoneNumber };
      const data = await addEmergencyContact(newContact);
      setContacts([...contacts, data]);
      setName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Failed to add emergency contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteEmergencyContact(id);
      setContacts(contacts.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete emergency contact:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
      <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contactItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    color: '#FF0000',
    marginTop: 10,
  },
});

export default EmergencyContacts;
