import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const CoachPortal = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showAthleteModal, setShowAthleteModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});

  // Sample data - in real app, this would come from your backend/SAI servers
  const talentedAthletes = [
    {
      id: 1,
      name: 'Aditya Singh',
      age: 19,
      state: 'Maharashtra',
      sport: 'Athletics',
      coordinates: { latitude: 19.0760, longitude: 72.8777 },
      aiScore: 87,
      tests: [
        { 
          name: 'Lunges', 
          score: 92, 
          video: 'lunges',
          videoSource: require('../assets/Lunges.mp4') // Make sure this path is correct
        },
        { 
          name: 'Squats', 
          score: 85, 
          video: 'squats',
          videoSource: require('../assets/Squats.mp4') // Make sure this path is correct
        },
        { 
          name: 'Agility Test', 
          score: 78, 
          video: 'agility_video_1',
          videoSource: null // No video available for this test
        }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      age: 16,
      state: 'Gujarat',
      sport: 'Swimming',
      coordinates: { latitude: 23.0225, longitude: 72.5714 },
      aiScore: 91,
      tests: [
        { 
          name: 'Endurance Test', 
          score: 94, 
          video: 'endurance_video_1',
          videoSource: null
        },
        { 
          name: 'Reaction Time', 
          score: 88, 
          video: 'reaction_video_1',
          videoSource: null
        }
      ]
    },
    {
      id: 3,
      name: 'Vikram Singh',
      age: 18,
      state: 'Punjab',
      sport: 'Boxing',
      coordinates: { latitude: 31.1471, longitude: 75.3412 },
      aiScore: 83,
      tests: [
        { 
          name: 'Power Test', 
          score: 89, 
          video: 'power_video_1',
          videoSource: null
        },
        { 
          name: 'Speed Test', 
          score: 76, 
          video: 'speed_video_1',
          videoSource: null
        }
      ]
    },
    {
      id: 4,
      name: 'Ananya Reddy',
      age: 17,
      state: 'Kerala',
      sport: 'Long Jump',
      coordinates: { latitude: 10.8505, longitude: 76.2711 },
      aiScore: 95,
      tests: [
        { 
          name: 'Jump Test', 
          score: 95, 
          video: 'jump_video_2',
          videoSource: null
        },
        { 
          name: 'Flexibility', 
          score: 93, 
          video: 'flexibility_video_1',
          videoSource: null
        }
      ]
    }
  ];

  const stateAthletesCount = talentedAthletes.reduce((acc, athlete) => {
    acc[athlete.state] = (acc[athlete.state] || 0) + 1;
    return acc;
  }, {});

  const handleStatePress = (state) => {
    setSelectedState(state);
  };

  const handleAthletePress = (athlete) => {
    setSelectedAthlete(athlete);
    setShowAthleteModal(true);
  };

  const handleVideoPress = (test) => {
    if (test.videoSource) {
      setCurrentVideo(test);
      setShowVideoModal(true);
    } else {
      alert(`Video not available for ${test.name}`);
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideo(null);
    setVideoStatus({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coach Talent Portal</Text>
        <Text style={styles.subtitle}>Discover promising athletes across India</Text>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Talent Distribution Map</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 15,
            longitudeDelta: 15,
          }}
        >
          {talentedAthletes.map(athlete => (
            <Marker
              key={athlete.id}
              coordinate={athlete.coordinates}
              onPress={() => handleAthletePress(athlete)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>{athlete.aiScore}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Talent by State</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.entries(stateAthletesCount).map(([state, count]) => (
            <TouchableOpacity 
              key={state} 
              style={[styles.stateCard, selectedState === state && styles.stateCardSelected]}
              onPress={() => handleStatePress(state)}
            >
              <Text style={styles.stateName}>{state}</Text>
              <Text style={styles.talentCount}>{count} talents</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedState && (
        <View style={styles.athleteList}>
          <Text style={styles.sectionTitle}>Talents in {selectedState}</Text>
          <ScrollView>
            {talentedAthletes
              .filter(athlete => athlete.state === selectedState)
              .map(athlete => (
                <TouchableOpacity 
                  key={athlete.id} 
                  style={styles.athleteCard}
                  onPress={() => handleAthletePress(athlete)}
                >
                  <View style={styles.athleteInfo}>
                    <Text style={styles.athleteName}>{athlete.name}</Text>
                    <Text style={styles.athleteDetails}>{athlete.age} years • {athlete.sport}</Text>
                  </View>
                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>AI Score: {athlete.aiScore}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      )}

      {/* Athlete Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAthleteModal}
        onRequestClose={() => setShowAthleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAthlete && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedAthlete.name}</Text>
                  <TouchableOpacity onPress={() => setShowAthleteModal(false)}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.athleteSummary}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Age</Text>
                    <Text style={styles.summaryValue}>{selectedAthlete.age}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>State</Text>
                    <Text style={styles.summaryValue}>{selectedAthlete.state}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Sport</Text>
                    <Text style={styles.summaryValue}>{selectedAthlete.sport}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>AI Score</Text>
                    <Text style={[styles.summaryValue, styles.highScore]}>{selectedAthlete.aiScore}/100</Text>
                  </View>
                </View>
                
                <Text style={styles.sectionTitle}>Performance Tests</Text>
                
                <ScrollView>
                  {selectedAthlete.tests.map((test, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.testCard}
                      onPress={() => handleVideoPress(test)}
                    >
                      <View style={styles.testInfo}>
                        <Text style={styles.testName}>{test.name}</Text>
                        <View style={styles.scoreContainer}>
                          <Text style={styles.testScore}>{test.score}/100</Text>
                          <View style={[styles.scoreBar, { width: `${test.score}%` }]} />
                        </View>
                      </View>
                      <View style={styles.playButtonContainer}>
                        <MaterialIcons 
                          name={test.videoSource ? "play-circle-outline" : "videocam-off"} 
                          size={24} 
                          color={test.videoSource ? "#0066CC" : "#ccc"} 
                        />
                        {test.videoSource && (
                          <Text style={styles.videoAvailable}>Video</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => alert(`Contact ${selectedAthlete.name}`)}
                >
                  <Text style={styles.contactButtonText}>Contact Athlete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showVideoModal}
        onRequestClose={closeVideoModal}
      >
        <View style={styles.videoModalContainer}>
          <View style={styles.videoHeader}>
            <TouchableOpacity onPress={closeVideoModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            {currentVideo && (
              <View style={styles.videoTitle}>
                <Text style={styles.videoTitleText}>
                  {selectedAthlete?.name} - {currentVideo.name}
                </Text>
                <Text style={styles.videoScore}>Score: {currentVideo.score}/100</Text>
              </View>
            )}
          </View>
          
          {currentVideo && currentVideo.videoSource && (
            <Video
              source={currentVideo.videoSource}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setVideoStatus(status)}
            />
          )}
          
          <View style={styles.videoControls}>
            <Text style={styles.videoInfo}>
              Performance Analysis: {currentVideo?.name}
            </Text>
            <Text style={styles.videoDetails}>
              This video shows the athlete's technique and form during the {currentVideo?.name.toLowerCase()} exercise.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 60,
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
  mapContainer: {
    height: 300,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 15,
  },
  marker: {
    backgroundColor: '#0066CC',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsContainer: {
    padding: 15,
  },
  stateCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stateCardSelected: {
    backgroundColor: '#e6f2ff',
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  stateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  talentCount: {
    fontSize: 14,
    color: '#666',
  },
  athleteList: {
    flex: 1,
    padding: 15,
  },
  athleteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  athleteDetails: {
    fontSize: 14,
    color: '#666',
  },
  scoreBadge: {
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreText: {
    color: '#0066CC',
    fontWeight: '600',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  athleteSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  summaryItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  highScore: {
    color: '#0066CC',
  },
  testCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  scoreContainer: {
    position: 'relative',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  testScore: {
    position: 'absolute',
    zIndex: 2,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    lineHeight: 20,
  },
  scoreBar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 10,
  },
  playButtonContainer: {
    alignItems: 'center',
  },
  videoAvailable: {
    fontSize: 10,
    color: '#0066CC',
    marginTop: 2,
  },
  contactButton: {
    backgroundColor: '#0066CC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Video Modal Styles
  videoModalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    padding: 5,
  },
  videoTitle: {
    flex: 1,
    marginLeft: 20,
  },
  videoTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoScore: {
    color: '#0066CC',
    fontSize: 14,
    marginTop: 2,
  },
  video: {
    flex: 1,
    width: width,
    backgroundColor: '#000',
  },
  videoControls: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  videoInfo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoDetails: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CoachPortal;