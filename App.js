import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ModeSelectionScreen from './src/screens/ModeSelectionScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import CompletionScreen from './src/screens/CompletionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#667eea" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Seren Capture',
              headerLeft: () => null, // Disable back button on home
            }}
          />
          <Stack.Screen 
            name="ModeSelection" 
            component={ModeSelectionScreen}
            options={{
              title: 'Select Capture Mode',
            }}
          />
          <Stack.Screen 
            name="Capture" 
            component={CaptureScreen}
            options={{
              title: 'Capture Images',
            }}
          />
          <Stack.Screen 
            name="Completion" 
            component={CompletionScreen}
            options={{
              title: 'Capture Complete',
              headerLeft: () => null, // Disable back button on completion
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}