import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AssessmentScreen = ({ navigation }) => {
  const tests = [
    { 
      id: 1, 
      name: 'Vertical Jump', 
      description: 'Measure your jumping ability',
      onPress: () => navigation.navigate('Pushup')
    },
    { 
      id: 2, 
      name: 'Sprint Test', 
      description: 'Measure your running speed',
      onPress: () => navigation.navigate('Pushup')
    },
    { 
      id: 3, 
      name: 'Sit-ups', 
      description: 'Measure your core strength',
      onPress: () => navigation.navigate('Pushup')
    },
    { 
      id: 4, 
      name: 'Push-ups', 
      description: 'Measure your upper body strength',
      onPress: () => navigation.navigate('Pushup')
    },
    { 
      id: 5, 
      name: 'Agility Test', 
      description: 'Measure your quickness and coordination',
      onPress: () => navigation.navigate('Pushup')
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessment Tests</Text>
        <Text style={styles.subtitle}>
          Complete these tests to evaluate your athletic potential
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {tests.map(test => (
          <TouchableOpacity 
            key={test.id} 
            style={styles.testCard} 
            onPress={test.onPress}
          >
            <View style={styles.testInfo}>
              <Text style={styles.testName}>{test.name}</Text>
              <Text style={styles.testDescription}>{test.description}</Text>
            </View>
            <View style={styles.testAction}>
              <Text style={styles.startText}>START</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your results will be compared with national standards
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  testCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
  },
  testAction: {
    paddingLeft: 15,
  },
  startText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});

export default AssessmentScreen;