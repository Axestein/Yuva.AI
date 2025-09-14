import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingQuestions from './screens/OnboardingQuestions';
import AssessmentScreen from './screens/AssessmentScreen';
import PushupScreen from './screens/PushupScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingQuestions} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="Pushup" component={PushupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}