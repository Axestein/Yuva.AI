import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your existing screens
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingQuestions from './screens/OnboardingQuestions';
import AssessmentScreen from './screens/AssessmentScreen';
import PushupScreen from './screens/PushupScreen';

// Import new screens for coach portal
import LoginScreen from './screens/loginScreen';
import CoachPortal from './screens/CoachPortal';
import AthletesListScreen from './screens/AthletesListScreen';
import CoachProfileScreen from './screens/CoachProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Regular user tab navigator (for athletes)
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Assessment') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Pushup') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Assessment" component={AssessmentScreen} />
      <Tab.Screen name="Pushup" component={PushupScreen} />
      <Tab.Screen name="Profile" component={CoachProfileScreen} />
    </Tab.Navigator>
  );
}

// Coach tab navigator
function CoachTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TalentMap') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Athletes') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'CoachProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="TalentMap" component={CoachPortal} options={{ title: 'Talent Map' }} />
      <Tab.Screen name="Athletes" component={AthletesListScreen} />
      <Tab.Screen name="CoachProfile" component={CoachProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userType, setUserType] = useState(null); // null, 'athlete', or 'coach'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false
        }}
      >
        {!isLoggedIn ? (
          // Show welcome and onboarding for new users
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingQuestions} />
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUserType={setUserType} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        ) : userType === 'coach' ? (
          // Coach interface
          <Stack.Screen name="CoachDashboard" component={CoachTabs} />
        ) : (
          // Athlete/regular user interface
          <>
            <Stack.Screen name="UserDashboard" component={UserTabs} />
            <Stack.Screen name="Pushup" component={PushupScreen} />
          </>
        )}
        
        {/* Common screens accessible from both flows */}
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}