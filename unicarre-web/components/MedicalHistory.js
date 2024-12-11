import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getMedicalHistory, addMedicalHistory, updateMedicalHistory, deleteMedicalHistory } from './api'; // Import the API functions

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMedicalHistory();
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch medical history:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleAddHistory = async () => {
    try {
      const newRecord = { regNumber: 'R123456', description, date };
      const data = await addMedicalHistory(newRecord);
      setHistory([...history, data]);
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Failed to add medical history record:', error);
    }
  };

  const handleUpdateHistory = async (id) => {
    try {
      const updatedRecord = { description, date };
      const data = await updateMedicalHistory(id, updatedRecord);
      setHistory(history.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      console.error('Failed to update medical history record:', error);
    }
  };

  const handleDeleteHistory = async (id) => {
    try {
      await deleteMedicalHistory(id);
      setHistory(history.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete medical history record:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.description}</Text>
      <Text style={styles.historyDate}>{item.date}</Text>
      <TouchableOpacity onPress={() => handleUpdateHistory(item.id)}>
        <Text style={styles.updateButton}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteHistory(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical History</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddHistory}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={history}
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
  historyItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
  historyDate: {
    fontSize: 14,
    color: '#888',
  },
  updateButton: {
    color: '#007BFF',
    marginTop: 10,
  },
  deleteButton: {
    color: '#FF0000',
    marginTop: 10,
  },
});

export default MedicalHistory;
