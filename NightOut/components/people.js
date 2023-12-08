import React, {useEffect, useState, useCallback, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList } from 'react-native';
import Appstyles from '../App.scss';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Footer from '../components/footer';
import {NavigationContainer, useNavigation, route} from '@react-navigation/native';



const APIKEY = "eefffa08c2021907551807259c25b762";
const IMGBASEPATH = "https://image.tmdb.org/t/p/original";

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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWZmZmEwOGMyMDIxOTA3NTUxODA3MjU5YzI1Yjc2MiIsInN1YiI6IjY1NzBkMDBiODViMTA1MDE0ZDA1MGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v9i2mb1IQouIKfjtUUYs9-o2QXEofwwW_mbcaCeFNsI'
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