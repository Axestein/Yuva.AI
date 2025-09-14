import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Alert, Vibration } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Import Camera with proper handling
let Camera;
let CameraAvailable = false;

try {
  const cameraModule = require('expo-camera');
  
  // Check if it's the default export or named export
  if (cameraModule.Camera) {
    Camera = cameraModule.Camera;
    CameraAvailable = true;
  } else if (cameraModule.default && cameraModule.default.Camera) {
    Camera = cameraModule.default.Camera;
    CameraAvailable = true;
  } else if (typeof cameraModule === 'function') {
    Camera = cameraModule;
    CameraAvailable = true;
  }
} catch (error) {
  console.warn('Camera module not available:', error);
  CameraAvailable = false;
}

// Fallback component if camera is not available
const CameraFallback = () => (
  <View style={styles.cameraFallback}>
    <Text style={styles.fallbackText}>Camera Preview</Text>
    <Text style={styles.fallbackSubtext}>Camera not available in this environment</Text>
    <View style={styles.guideOverlay}>
      <View style={styles.guideBox} />
      <Text style={styles.guideText}>Position your body here</Text>
    </View>
  </View>
);

const { width, height } = Dimensions.get('window');

const PushupScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [loadingState, setLoadingState] = useState('ready');
  const [feedback, setFeedback] = useState('');
  const [cameraAvailable, setCameraAvailable] = useState(CameraAvailable);

  // References for exercise tracking
  const countingStateRef = useRef('up');
  const lastRepTimeRef = useRef(0);
  const processingRef = useRef(false);
  const detectionIntervalRef = useRef(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      if (!cameraAvailable) {
        setHasPermission(false);
        return;
      }
      
      try {
        // Check if Camera permissions API is available
        if (Camera && Camera.requestCameraPermissionsAsync) {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        } else {
          setHasPermission(false);
          setCameraAvailable(false);
        }
      } catch (error) {
        console.error('Camera permission error:', error);
        setHasPermission(false);
        setCameraAvailable(false);
      }
    })();
  }, [cameraAvailable]);

  // Setup motion detection interval
  useEffect(() => {
    if (isTracking && hasPermission && cameraAvailable) {
      detectionIntervalRef.current = setInterval(() => {
        detectMotion();
      }, 1000);
    } else {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isTracking, hasPermission, cameraAvailable]);

  // Simple motion detection simulation
  const detectMotion = async () => {
    if (processingRef.current) return;
    
    processingRef.current = true;
    
    try {
      // Simulate motion detection with random chance
      const currentTime = Date.now();
      const timeSinceLastRep = currentTime - lastRepTimeRef.current;
      
      const hasMotion = Math.random() > 0.7; // 30% chance of motion
      
      if (hasMotion && timeSinceLastRep > 1500) {
        simulatePushupDetection();
      }
    } catch (error) {
      console.error('Error in motion detection:', error);
    } finally {
      processingRef.current = false;
    }
  };

  // Simulate pushup detection
  const simulatePushupDetection = () => {
    const currentTime = Date.now();
    const timeSinceLastRep = currentTime - lastRepTimeRef.current;

    if (countingStateRef.current === 'up' && timeSinceLastRep > 1500) {
      countingStateRef.current = 'down';
      setFeedback('Down position detected');
    } else if (countingStateRef.current === 'down' && timeSinceLastRep > 1500) {
      countingStateRef.current = 'up';
      setExerciseCount(prev => prev + 1);
      lastRepTimeRef.current = currentTime;
      setFeedback('Push-up counted! ✓');
      Vibration.vibrate(100);
    }
  };

  const toggleTracking = () => {
    if (!cameraAvailable) {
      setFeedback('Camera not available. Using simulation mode.');
      // Simulate counting in demo mode
      setExerciseCount(prev => prev + 1);
      return;
    }
    
    if (hasPermission === false) {
      setFeedback('Camera permission denied. Using manual mode.');
      return;
    }
    
    setIsTracking(!isTracking);
    setFeedback(isTracking ? 'Tracking paused' : 'Tracking started! Perform push-ups');
  };

  const resetStats = () => {
    setExerciseCount(0);
    setFeedback('Counter reset to zero');
    countingStateRef.current = 'up';
    lastRepTimeRef.current = 0;
  };

  const handleManualCount = () => {
    setExerciseCount(prev => prev + 1);
    setFeedback('Manual count added! ✓');
    Vibration.vibrate(100);
  };

  if (hasPermission === null && cameraAvailable) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF9800" />
        <Text style={styles.text}>Checking camera permissions...</Text>
      </View>
    );
  }

  // Render the appropriate camera component or fallback
  const renderCamera = () => {
    if (!cameraAvailable || hasPermission === false) {
      return <CameraFallback />;
    }
    
    // Check if Camera is a valid React component
    if (typeof Camera !== 'function') {
      return <CameraFallback />;
    }
    
    return (
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Type.back}
      >
        <View style={styles.overlay}>
          <View style={styles.counterOverlay}>
            <Text style={styles.counterText}>{exerciseCount}</Text>
            <Text style={styles.counterLabel}>PUSH-UPS</Text>
          </View>
          
          {feedback ? (
            <View style={styles.feedbackOverlay}>
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
          ) : null}

          <View style={styles.guideOverlay}>
            <View style={styles.guideBox} />
            <Text style={styles.guideText}>Position your body here</Text>
          </View>

          <View style={styles.statusOverlay}>
            <View style={[styles.statusIndicator, isTracking ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>
                {isTracking ? '● RECORDING' : '○ PAUSED'}
              </Text>
            </View>
          </View>
        </View>
      </Camera>
    );
  };

  return (
    <View style={styles.container}>
      {/* Camera Preview Area */}
      <View style={styles.cameraContainer}>
        {renderCamera()}
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.exerciseName}>Push-up Assessment</Text>
            <Text style={styles.assessmentText}>
              {cameraAvailable && hasPermission ? 'Motion Detection Mode' : 'Demo Mode'}
            </Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{exerciseCount}</Text>
            <Text style={styles.countLabel}>COUNTED</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, isTracking ? styles.stopButton : styles.startButton]}
            onPress={toggleTracking}
          >
            <Text style={styles.actionButtonText}>
              {isTracking ? '⏸️ PAUSE' : '▶️ START'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={resetStats}
          >
            <Text style={styles.actionButtonText}>🔄 RESET</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, styles.manualButton]}
          onPress={handleManualCount}
        >
          <Text style={styles.actionButtonText}>👆 MANUAL COUNT</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ About This Demo</Text>
          <Text style={styles.infoText}>
            {cameraAvailable && hasPermission
              ? 'Camera is active. Motion detection is simulated for this demo.'
              : 'Using demo mode. Camera features are not available in this environment.'
            }
          </Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>📋 Instructions:</Text>
          <Text style={styles.tip}>• Position yourself 2-3 meters from camera</Text>
          <Text style={styles.tip}>• Ensure good lighting in the room</Text>
          <Text style={styles.tip}>• Keep your entire body in the frame</Text>
          <Text style={styles.tip}>• Perform push-ups at a steady pace</Text>
          <Text style={styles.tip}>• Use manual count button if needed</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Tests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraFallback: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fallbackSubtext: {
    color: '#FF9800',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  counterOverlay: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF9800',
  },
  counterText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  counterLabel: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  feedbackOverlay: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    alignItems: 'center',
  },
  feedbackText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
  guideOverlay: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    right: '15%',
    bottom: '30%',
    borderWidth: 2,
    borderColor: 'rgba(255,152,0,0.4)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  guideBox: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'rgba(255,152,0,0.3)',
    borderRadius: 10,
  },
  guideText: {
    color: 'rgba(255,152,0,0.8)',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  statusOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  statusIndicator: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  statusActive: {
    backgroundColor: 'rgba(220,38,38,0.7)',
  },
  statusInactive: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controlsContainer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  assessmentText: {
    color: '#FF9800',
    fontSize: 12,
  },
  countContainer: {
    alignItems: 'center',
  },
  countText: {
    color: '#FF9800',
    fontSize: 28,
    fontWeight: 'bold',
  },
  countLabel: {
    color: '#ccc',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  manualButton: {
    backgroundColor: '#2196F3',
    marginBottom: 20,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    marginBottom: 20,
  },
  infoTitle: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#93C5FD',
    fontSize: 14,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tip: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: '#555',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PushupScreen;