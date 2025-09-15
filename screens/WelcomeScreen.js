import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Logo and Tagline */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Yuva.AI</Text>
            <Text style={styles.tagline}>AI-Driven Talent Scout</Text>
          </View>
          
          {/* App Features Highlights */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.iconText}>📱</Text>
              </View>
              <Text style={styles.featureText}>On-Device AI Analysis and live ranking</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.iconText}>🏃</Text>
              </View>
              <Text style={styles.featureText}>Realtime Excercise Tracking</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.iconText}>🛡️</Text>
              </View>
              <Text style={styles.featureText}>Cheat Detection and encrypted upload</Text>
            </View>
          </View>
          
          {/* Call to Action Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Onboarding')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
          
          {/* Footer Text */}
          <Text style={styles.footerText}>
            Democratizing Sports Talent Assessment Across India
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.08,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 18,
    color: '#FF9800',
    marginTop: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  featuresContainer: {
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    width: '90%',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF9800',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: '500',
  },
});