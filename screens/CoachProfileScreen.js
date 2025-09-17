// screens/CoachProfileScreen.js (simple version)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoachProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coach Profile</Text>
      <Text style={styles.text}>Coach information and settings will appear here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

export default CoachProfileScreen;