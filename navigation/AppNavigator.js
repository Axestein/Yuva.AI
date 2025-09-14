import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingQuestions from '../screens/OnboardingQuestions';
import AssessmentScreen from '../screens/AssessmentScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingQuestions} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;