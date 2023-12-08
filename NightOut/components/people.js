import React, {useEffect, useState, useCallback, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList } from 'react-native';
import Appstyles from '../App.scss';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Footer from '../components/footer';
import {NavigationContainer, useNavigation, route} from '@react-navigation/native';
import {REACT_APP_APIKEY, REACT_APP_AUTHKEY} from "@env"

const APIKEY = REACT_APP_APIKEY;
const AUTHKEY = REACT_APP_AUTHKEY;
const IMGBASEPATH = "https://image.tmdb.org/t/p/";

SplashScreen.preventAutoHideAsync();

export default function People({ route }) {

  const [isLoading, setLoading] = useState(true);
  const [peopleName, setPeopleName] = useState([]);
  const [peopleImage, setPeopleImage] = useState([]);
  const { id } = route.params;

  const [isLoaded] = useFonts({
    "dm-xbold": require("../assets/fonts/DMSans_18pt-Black.ttf"),
    "dm-regular": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
  });

  let fetchMovies = async (action) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: AUTHKEY
        }
      };
  
      try {
          const response = await fetch(`https://api.themoviedb.org/3/${action}?language=en-US&api-key=${APIKEY}`, options);
          const json = await response.json();
          return json;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setLoading(false);
      }
  };

  let initPeople = async (action) => {
    let json = await fetchMovies(action);
    setPeopleName(json.name);
    setPeopleImage(IMGBASEPATH + json.profile_path);
  }

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  useEffect(() => {
    initPeople(`person/${id}`);
  }, []);
  
  return (
    <ScrollView style={Appstyles.containerPeople} onLayout={handleOnLayout}>
      {isLoading ? (
        <ActivityIndicator />
        ) : (
          <View style={Appstyles.peopleView}>
            <ImageBackground source={{ url :  peopleImage }} resizeMode="cover" style={Appstyles.peopleBgImage}>
                <Text style={Appstyles.trendingItemTitle}>{peopleName}</Text>
            </ImageBackground>
          </View>
      )}
        <StatusBar style="light" />
    </ScrollView>
  );
}
