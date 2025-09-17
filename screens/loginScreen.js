// screens/LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ navigation, setUserType, setIsLoggedIn }) => {
  const handleAthleteLogin = () => {
    setUserType('athlete');
    setIsLoggedIn(true);
  };

  const handleCoachLogin = () => {
    setUserType('coach');
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Yuva: AI Talent Scout</Text>
      <Text style={styles.subtitle}>Select your login type</Text>
      
      <TouchableOpacity 
        style={[styles.loginButton, styles.athleteButton]}
        onPress={handleAthleteLogin}
      >
        <Text style={styles.buttonText}>Login as Athlete</Text>
        <Text style={styles.buttonSubtext}>Take assessments and track your progress</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.loginButton, styles.coachButton]}
        onPress={handleCoachLogin}
      >
        <Text style={styles.buttonText}>Login as Coach</Text>
        <Text style={styles.buttonSubtext}>Discover talent and review performances</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  athleteButton: {
    backgroundColor: '#0066CC',
  },
  coachButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});

export default LoginScreen;