import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import pfp from '../assets/images/pfp.jpg';

import benchpress from '../assets/images/BenchPress.jpg';
import squats from '../assets/images/Squats.jpg';
import deadlifts from '../assets/images/Deadlift.jpg';
import running from '../assets/images/Running.jpg';
import cycling from '../assets/images/Cycling.jpg';
import jumprope from '../assets/images/Jumprope.jpg';
import streching from '../assets/images/Stretching.png';
import yoga from '../assets/images/Yoga.jpg';
import pilates from '../assets/images/Pilates.jpg';

// Separate NavBar Component
const NavBar = ({ activeTab, setActiveTab }) => (
  <View style={styles.navBar}>
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
      onPress={() => setActiveTab('home')}
    >
      <Ionicons name="home" size={24} color={activeTab === 'home' ? '#0066CC' : '#666'} />
      <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'exercises' && styles.navItemActive]}
      onPress={() => setActiveTab('exercises')}
    >
      <MaterialIcons name="fitness-center" size={24} color={activeTab === 'exercises' ? '#0066CC' : '#666'} />
      <Text style={[styles.navText, activeTab === 'exercises' && styles.navTextActive]}>Exercises</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'tests' && styles.navItemActive]}
      onPress={() => setActiveTab('tests')}
    >
      <Ionicons name="analytics" size={24} color={activeTab === 'tests' ? '#0066CC' : '#666'} />
      <Text style={[styles.navText, activeTab === 'tests' && styles.navTextActive]}>Tests</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
      onPress={() => setActiveTab('profile')}
    >
      <Ionicons name="person" size={24} color={activeTab === 'profile' ? '#0066CC' : '#666'} />
      <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>Profile</Text>
    </TouchableOpacity>
  </View>
);

// Home Screen Component
const HomeScreen = () => (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <View style={styles.welcomeCard}>
      <Text style={styles.welcomeText}>Welcome back, Aditya!</Text>
      <Text style={styles.welcomeSubtext}>Ready for today's training?</Text>
    </View>

    <View style={styles.statsCard}>
      <Text style={styles.sectionTitle}>Your Performance Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome5 name="running" size={20} color="#0066CC" />
          </View>
          <Text style={styles.statValue}>76</Text>
          <Text style={styles.statLabel}>Overall Score</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name="trophy" size={20} color="#FF9500" />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Tests Completed</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <MaterialCommunityIcons name="target" size={20} color="#34C759" />
          </View>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Goals Achieved</Text>
        </View>
      </View>
    </View>

    <View style={styles.progressCard}>
      <Text style={styles.sectionTitle}>Weekly Progress</Text>
      <View style={styles.barChart}>
        {[60, 75, 45, 80, 65, 90, 70].map((value, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={[styles.bar, { height: value }]} />
            <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.upcomingCard}>
      <Text style={styles.sectionTitle}>Upcoming Tests</Text>
      <View style={styles.upcomingItem}>
        <View style={styles.upcomingIcon}>
          <Ionicons name="barbell" size={24} color="#0066CC" />
        </View>
        <View style={styles.upcomingInfo}>
          <Text style={styles.upcomingTitle}>Strength Assessment</Text>
          <Text style={styles.upcomingTime}>Tomorrow, 9:00 AM</Text>
        </View>
        <TouchableOpacity style={styles.upcomingButton}>
          <Text style={styles.upcomingButtonText}>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.upcomingItem}>
        <View style={styles.upcomingIcon}>
          <Ionicons name="timer" size={24} color="#FF9500" />
        </View>
        <View style={styles.upcomingInfo}>
          <Text style={styles.upcomingTitle}>Speed Test</Text>
          <Text style={styles.upcomingTime}>In 2 days, 4:30 PM</Text>
        </View>
        <TouchableOpacity style={styles.upcomingButton}>
          <Text style={styles.upcomingButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

// Profile Screen Component
const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Aditya Singh',
    email: 'aditya.singh@example.com',
    age: '19',
    sport: 'MMA',
    position: 'Forward',
    level: 'Intermediate',
    height: '168 cm',
    weight: '70 kg'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={pfp} 
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileLevel}>{userData.level} {userData.sport} Player</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons name={isEditing ? "checkmark" : "create"} size={24} color="#0066CC" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{userData.age} years</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sport</Text>
          <Text style={styles.infoValue}>{userData.sport}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Position</Text>
          <Text style={styles.infoValue}>{userData.position}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>{userData.height}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{userData.weight}</Text>
        </View>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications" size={22} color="#666" />
          <Text style={styles.settingText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={22} color="#CCC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="lock-closed" size={22} color="#666" />
          <Text style={styles.settingText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={22} color="#CCC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle" size={22} color="#666" />
          <Text style={styles.settingText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={22} color="#CCC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="log-out" size={22} color="#FF3B30" />
          <Text style={[styles.settingText, { color: '#FF3B30' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Tests Screen Component (your original content)
const TestsScreen = ({ navigation }) => {
  const testCategories = [
    { 
      id: 1, 
      name: 'Physical Assessments', 
      icon: '🏃‍♂️',
      description: 'Measure your physical capabilities',
      tests: [
        { id: 1, name: 'Vertical Jump', description: 'Measure explosive leg power', status: 'pending' },
        { id: 2, name: 'Sprint Test', description: 'Measure acceleration and speed', status: 'pending' },
        { id: 3, name: 'Agility Test', description: 'Measure quickness and coordination', status: 'pending' },
        { id: 4, name: 'Endurance Run', description: 'Measure cardiovascular fitness', status: 'pending' },
      ]
    },
    { 
      id: 2, 
      name: 'Strength Tests', 
      icon: '💪',
      description: 'Evaluate your muscular strength',
      tests: [
        { id: 5, name: 'Push-ups', description: 'Measure upper body strength', status: 'pending' },
        { id: 6, name: 'Sit-ups', description: 'Measure core strength', status: 'pending' },
        { id: 7, name: 'Pull-ups', description: 'Measure back and arm strength', status: 'pending' },
        { id: 8, name: 'Plank Test', description: 'Measure core endurance', status: 'pending' },
      ]
    },
    { 
      id: 3, 
      name: 'Skill Assessments', 
      icon: '⚽',
      description: 'Evaluate sport-specific skills',
      tests: [
        { id: 9, name: 'Ball Control', description: 'Football dribbling skills', status: 'pending' },
        { id: 10, name: 'Shooting Accuracy', description: 'Precision and power', status: 'pending' },
        { id: 11, name: 'Reaction Time', description: 'Quick response ability', status: 'pending' },
        { id: 12, name: 'Coordination', description: 'Body movement harmony', status: 'pending' },
      ]
    },
  ];

  const aiMetrics = [
    { name: 'Power', value: 72, unit: 'points', icon: '⚡' },
    { name: 'Speed', value: 68, unit: 'points', icon: '🚀' },
    { name: 'Agility', value: 85, unit: 'points', icon: '🌀' },
    { name: 'Endurance', value: 61, unit: 'points', icon: '❤️' },
    { name: 'Strength', value: 77, unit: 'points', icon: '💪' },
    { name: 'Potential', value: 89, unit: 'points', icon: '🌟' },
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.aiScoreCard}>
        <Text style={styles.aiScoreTitle}>Your AI Talent Score</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>76</Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
        <Text style={styles.scoreDescription}>
          Based on your previous assessments
        </Text>
        
        <View style={styles.metricsGrid}>
          {aiMetrics.map((metric, index) => (
            <View key={index} style={styles.metricItem}>
              <Text style={styles.metricIcon}>{metric.icon}</Text>
              <Text style={styles.metricName}>{metric.name}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Assessment Categories</Text>
      
      {testCategories.map(category => (
        <View key={category.id} style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
          </View>
          
          <View style={styles.testsContainer}>
            {category.tests.map(test => (
              <TouchableOpacity 
                key={test.id} 
                style={styles.testItem}
                onPress={() => navigation.navigate('TestInstructions', { test })}
              >
                <View style={styles.testInfo}>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDescription}>{test.description}</Text>
                </View>
                <View style={[
                  styles.testStatus, 
                  test.status === 'completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                  <Text style={styles.statusText}>
                    {test.status === 'completed' ? 'COMPLETED' : 'START'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

// Exercises Screen Component
const ExercisesScreen = () => (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <Text style={styles.sectionTitle}>Training Exercises</Text>
    
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <MaterialIcons name="fitness-center" size={28} color="#0066CC" />
        <View style={styles.exerciseHeaderText}>
          <Text style={styles.exerciseCategory}>Strength Training</Text>
          <Text style={styles.exerciseCount}>8 exercises</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseScroll}>
        <View style={styles.exerciseItem}>
          <Image source={benchpress} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Bench Press</Text>
          <Text style={styles.exerciseDetail}>3 sets × 8 reps</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={squats} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Squats</Text>
          <Text style={styles.exerciseDetail}>4 sets × 10 reps</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={deadlifts} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Deadlifts</Text>
          <Text style={styles.exerciseDetail}>3 sets × 6 reps</Text>
        </View>
      </ScrollView>
    </View>

    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Ionicons name="barbell" size={28} color="#34C759" />
        <View style={styles.exerciseHeaderText}>
          <Text style={styles.exerciseCategory}>Cardio</Text>
          <Text style={styles.exerciseCount}>5 exercises</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseScroll}>
        <View style={styles.exerciseItem}>
          <Image source={running} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Running</Text>
          <Text style={styles.exerciseDetail}>30 mins</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={cycling} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Cycling</Text>
          <Text style={styles.exerciseDetail}>45 mins</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={jumprope} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Jump Rope</Text>
          <Text style={styles.exerciseDetail}>15 mins</Text>
        </View>
      </ScrollView>
    </View>

    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <MaterialCommunityIcons name="yoga" size={28} color="#FF9500" />
        <View style={styles.exerciseHeaderText}>
          <Text style={styles.exerciseCategory}>Flexibility</Text>
          <Text style={styles.exerciseCount}>6 exercises</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseScroll}>
        <View style={styles.exerciseItem}>
          <Image source={streching} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Stretching</Text>
          <Text style={styles.exerciseDetail}>20 mins</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={yoga} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Yoga</Text>
          <Text style={styles.exerciseDetail}>30 mins</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Image source={pilates} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>Pilates</Text>
          <Text style={styles.exerciseDetail}>25 mins</Text>
        </View>
      </ScrollView>
    </View>
  </ScrollView>
);

// Main Assessment Screen
const AssessmentScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <HomeScreen />;
      case 'exercises': return <ExercisesScreen />;
      case 'tests': return <TestsScreen navigation={navigation} />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {activeTab === 'home' ? 'Yuva.AI' : 
           activeTab === 'exercises' ? 'Training Exercises' :
           activeTab === 'tests' ? 'Talent Assessment' : 'My Profile'}
        </Text>
        <Text style={styles.subtitle}>
          {activeTab === 'home' ? 'Welcome to your training hub' : 
           activeTab === 'exercises' ? 'Improve your performance' :
           activeTab === 'tests' ? 'Complete tests to evaluate your athletic potential' : 
           'Manage your account and settings'}
        </Text>
      </View>

      {renderContent()}

      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 30,
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
  // Home Screen Styles
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    marginTop: 15,
  },
  barContainer: {
    alignItems: 'center',
    width: '12%',
  },
  bar: {
    width: 20,
    backgroundColor: '#0066CC',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 10,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  upcomingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  upcomingTime: {
    fontSize: 14,
    color: '#666',
  },
  upcomingButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#0066CC',
    borderRadius: 15,
  },
  upcomingButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Profile Screen Styles
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0066CC',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileLevel: {
    fontSize: 16,
    color: '#666',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  // Exercises Screen Styles
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseHeaderText: {
    marginLeft: 15,
  },
  exerciseCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseCount: {
    fontSize: 14,
    color: '#666',
  },
  exerciseScroll: {
    marginHorizontal: -5,
  },
  exerciseItem: {
    width: 150,
    marginRight: 15,
  },
  exerciseImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#666',
  },
  // Tests Screen Styles (original)
  aiScoreCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiScoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: -5,
  },
  scoreDescription: {
    color: '#666',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  metricItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  metricName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginLeft: 5,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  testsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  testItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
  },
  testStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusPending: {
    backgroundColor: '#FF9800',
  },
  statusCompleted: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  // NavBar Styles
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  navItemActive: {
    backgroundColor: '#f0f8ff',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#0066CC',
  },
});

export default AssessmentScreen;