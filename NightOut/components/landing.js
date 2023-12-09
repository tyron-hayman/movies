import React, {useEffect, useState, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, Button, Pressable, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import Appstyles from '../App.scss';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {REACT_APP_APIKEY, REACT_APP_AUTHKEY} from "@env"

const APIKEY = REACT_APP_APIKEY;
const AUTHKEY = REACT_APP_AUTHKEY;
const IMGBASEPATH = "https://image.tmdb.org/t/p/";

SplashScreen.preventAutoHideAsync();

export default function Landing() {

  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tvData, setTVData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [initImage, setInitImage] = useState([]);
  const [initTitle, setInitTitle] = useState([]);
  const [initYear, setInitYear] = useState([]);
  const [initRate, setInitRate] = useState([]);

  const [isLoaded] = useFonts({
    "dm-xbold": require("../assets/fonts/DMSans_18pt-Black.ttf"),
    "dm-regular": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
  });

  let fetchMovies = async (action) => {
    setLoading(true);

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

  let initFeatured = async (action) => {
    let json = await fetchMovies(action);
    let initMovieDate = new Date(json.results[0].release_date);
    setInitImage(IMGBASEPATH + "w1280/" + json.results[0].backdrop_path);
    setInitTitle(json.results[0].original_title);
    setInitYear(initMovieDate.toDateString());
    setInitRate(json.results[0].vote_average)
  }

  let initMovies = async (action) => {
    let json = await fetchMovies(action);
    setData(json.results);
  }

  let initTv = async (action) => {
    let json = await fetchMovies(action);
    setTVData(json.results);
  }

  let initPeople = async (action) => {
    let json = await fetchMovies(action);
    setPeopleData(json.results);

  }

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  useEffect(() => {
    initFeatured('movie/top_rated?page=1&')
    initMovies('trending/movie/day');
    initTv('trending/tv/day');
    initPeople('person/popular?page=1&');
  }, []);

  let bgImageLanding = {uri : initImage};
  let bgImageW = "w780/";
  let bgProImageW = "w185/";

  const renderItem = ({ item }) => (
    <View style={Appstyles.trendingItems}>
        <ImageBackground source={{uri : IMGBASEPATH + bgImageW + item.poster_path}} resizeMode="cover" style={Appstyles.trendingItemsImg}>
        </ImageBackground>
    </View>
  );

  const renderItemTV = ({ item }) => (
    <View style={Appstyles.trendingItems}>
        <ImageBackground source={{uri : IMGBASEPATH + bgImageW + item.poster_path}} resizeMode="cover" style={Appstyles.trendingItemsImg}>
        </ImageBackground>
    </View>
  );
  const renderItemPeople = ({ item }) => (
    <View style={Appstyles.trendingItems}>
      <TouchableWithoutFeedback 
      onPress={() =>
        navigation.navigate('People', { id: item.id })
      }>
        <ImageBackground source={{uri : IMGBASEPATH + bgProImageW + item.profile_path}} resizeMode="cover" style={Appstyles.trendingItemsImg}>
            <Text style={Appstyles.trendingItemTitle}>{item.name}</Text>
        </ImageBackground>
        </TouchableWithoutFeedback>
    </View>
  );
  
  return (
    <ScrollView style={Appstyles.container} onLayout={handleOnLayout}>
      {isLoading ? (
        <ActivityIndicator />
        ) : (
          <View style={Appstyles.landing}>
            <ImageBackground source={bgImageLanding} resizeMode="cover" style={Appstyles.landingBGImage}>
              <View style={Appstyles.header}>
                <View style={Appstyles.headerContent}>
                  <Text style={Appstyles.landingSubTitle}>Trending</Text>
                  <Text style={Appstyles.landingTitle}>{initTitle}</Text>
                  <Text style={Appstyles.landingRating}>User Score:  {initRate}/10</Text>
                </View>
              </View>
            </ImageBackground>
            <Text style={Appstyles.scrollViewTrendingTitle}>Trending Movies</Text>
            <FlatList 
                style={Appstyles.scrollViewTrending}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
            <Text style={Appstyles.scrollViewTrendingTitle}>Treding TV</Text>
            <FlatList 
                style={Appstyles.scrollViewTrending}
                data={tvData}
                renderItem={renderItemTV}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
            <Text style={Appstyles.scrollViewTrendingTitle}>Treding People</Text>
            <FlatList 
                style={Appstyles.scrollViewTrending}
                data={peopleData}
                renderItem={renderItemPeople}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
          </View>
      )}
        <StatusBar style="light" />
    </ScrollView>
  );
}
