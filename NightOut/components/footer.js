import React, {useEffect, useState, useCallback} from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList } from 'react-native';
import Appstyles from '../App.scss';
import { useFonts } from 'expo-font';

export default function Footer() {

  const [isLoading, setLoading] = useState(true);

  const [isLoaded] = useFonts({
    "dm-xbold": require("../assets/fonts/DMSans_18pt-Black.ttf"),
    "dm-regular": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
  });

 
  useEffect(() => {
    
  }, []);

  
  return (
    <View style={Appstyles.appFooter}>
        <Text style={Appstyles.appFooterTitle}>Notice</Text>
        <Text style={Appstyles.appFooterText}>We are currently still in BETA. If you experience any issues, please email the developer at hello@tyronhayman.com</Text>
    </View>
  );
}