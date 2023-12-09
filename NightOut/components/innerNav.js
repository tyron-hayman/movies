import React, {useEffect, useState, useCallback} from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList } from 'react-native';
import Appstyles from '../App.scss';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function InnerNav() {

  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [isLoaded] = useFonts({
    "dm-xbold": require("../assets/fonts/DMSans_18pt-Black.ttf"),
    "dm-regular": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
  });

 
  useEffect(() => {
    
  }, []);

  
  return (
    <View style={Appstyles.innerNav}>
        <Text style={Appstyles.backButton} onPress={() => {
                navigation.goBack();
            }}><FontAwesomeIcon style={Appstyles.backButtonIcon} icon={faArrowLeft} color={ '#ffffff' }/></Text>
    </View>
  );
}