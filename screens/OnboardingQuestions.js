import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
            value={userData[question.key]}
            onChangeText={(text) => handleInputChange(question.key, text)}
            keyboardType={question.inputType === 'number' ? 'numeric' : 'default'}
          />
        );
      case 'picker':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userData[question.key]}
              onValueChange={(value) => handleInputChange(question.key, value)}
              style={styles.picker}
            >
              {question.options.map(option => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / questions.length) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionTitle}>
          {questions[currentStep].title}
        </Text>

        {renderInput(questions[currentStep])}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
        >
          <Text style={styles.nextButtonText}>
            {currentStep === questions.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF9800',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
    flexWrap: 'wrap',
  },
  backButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  nextButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FF9800',
    minWidth: 100,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#bbb',
    minWidth: 100,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OnboardingQuestions;
