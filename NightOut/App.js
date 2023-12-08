import React, {useEffect, useState, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList } from 'react-native';
import Appstyles from './App.scss';
import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './components/landing';
import People from './components/people';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setLoading] = useState(true);

  const [isLoaded] = useFonts({
    "dm-xbold": require("./assets/fonts/DMSans_18pt-Black.ttf"),
    "dm-regular": require("./assets/fonts/DMSans_18pt-Regular.ttf"),
  });

 
  useEffect(() => {
    
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Landing"
          component={Landing}
        />
        <Stack.Screen
          name="People"
          component={People}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
