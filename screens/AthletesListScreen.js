// screens/AthletesListScreen.js (simple version)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AthletesListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Athletes Database</Text>
      <Text style={styles.text}>List of all athletes will appear here</Text>
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

export default AthletesListScreen;