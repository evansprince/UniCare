import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigator from './navigation/MainNavigation'; // Import the MainNavigator

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator /> {/* Use the MainNavigator */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
