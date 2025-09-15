import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const OnboardingQuestions = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: 'male',
    location: '',
    sportInterest: '',
  });

  const questions = [
    {
      title: "What's your name?",
      key: 'name',
      inputType: 'text',
      placeholder: 'Enter your full name'
    },
    {
      title: "How old are you?",
      key: 'age',
      inputType: 'number',
      placeholder: 'Enter your age'
    },
    {
      title: "What's your gender?",
      key: 'gender',
      inputType: 'picker',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to say', value: 'not_say' },
      ]
    },
    {
      title: "Where are you from?",
      key: 'location',
      inputType: 'text',
      placeholder: 'Enter your city/village'
    },
    {
      title: "Which sport are you most interested in?",
      key: 'sportInterest',
      inputType: 'text',
      placeholder: 'e.g., Athletics, Football, Cricket'
    },
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save user data and navigate to next screen
      navigation.navigate('Assessment');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Assessment');
  };

  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value
    });
  };

  const renderInput = (question) => {
    switch (question.inputType) {
      case 'text':
      case 'number':
        return (
          <TextInput
            style={styles.input}
            placeholder={question.placeholder}
            placeholderTextColor="#999"
            value={userData[question.key]}
            onChangeText={(text) => handleInputChange(question.key, text)}
            keyboardType={question.inputType === 'number' ? 'numeric' : 'default'}
            autoFocus={true}
          />
        );
      case 'picker':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userData[question.key]}
              onValueChange={(value) => handleInputChange(question.key, value)}
              style={styles.picker}
              dropdownIconColor="#FF9800"
            >
              {question.options.map(option => (
                <Picker.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value} 
                />
              ))}
            </Picker>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Progress section with added padding from top */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Getting to know you</Text>
            <Text style={styles.progressText}>
              {currentStep + 1} of {questions.length}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentStep + 1) / questions.length) * 100}%` }
              ]}
            />
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>
              {questions[currentStep].title}
            </Text>
            
            <View style={styles.inputContainer}>
              {renderInput(questions[currentStep])}
            </View>
            
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>
                This helps us personalize your experience
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {currentStep > 0 && (
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
                activeOpacity={0.7}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[
                styles.nextButton,
                !userData[questions[currentStep].key] && styles.nextButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!userData[questions[currentStep].key]}
              activeOpacity={0.7}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === questions.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressContainer: {
    paddingHorizontal: 25,
    paddingTop: 60, // Added padding to move progress bar down from status bar
    paddingBottom: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF9800',
    borderRadius: 3,
  },
  progressText: {
    color: '#666',
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  questionContainer: {
    marginVertical: 20,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
    lineHeight: 36,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 58,
    color: '#333',
  },
  hintContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  hintText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 25,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: '#FF9800',
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#888',
    fontWeight: '500',
  },
});

export default OnboardingQuestions;