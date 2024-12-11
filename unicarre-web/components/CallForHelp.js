import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const CallForHelp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call for Help</Text>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:911')}>
        <Text style={styles.buttonText}>Call Emergency Services</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#FF0000', padding: 15, borderRadius: 5 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
});

export default CallForHelp;
