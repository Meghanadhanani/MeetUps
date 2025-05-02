import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ArrowIcon from '../assets/svgs/ArrowIcon.svg';
import NotificationIcon from '../assets/svgs/notification.svg';
import HameBurgerIcon from '../assets/svgs/HamBurger.svg';
import Logo from '../assets/svgs/LogoSvg.svg';
import BlueLogo from '../assets/svgs/LogoInBlue.svg';
import FillHeartIcon from "../assets/svgs/FillHeartIcon.svg"
import SaveIcon from "../assets/svgs/SaveIcon.svg"
import TimerIcon from "../assets/svgs/TimerIcon.svg"
import LocationIcon from "../assets/svgs/LocationIcon.svg"
import CommentIcon from "../assets/svgs/CommentICon.svg"
import VerifiedIcon from "../assets/svgs/Verified.svg"


import SearchIcon from '../assets/svgs/search.svg';
import EventCard from '../common/EventCard';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    setQuery(input);
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerItemOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [160, 85],
    extrapolate: 'clamp',
  });
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -70],
    extrapolate: 'clamp',
  });
  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  const whiteLogoOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const blueLogoOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const searchBgColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['#9ca2ff', '#F6F6F6'], // from light to darker (or any two colors)
    extrapolate: 'clamp',
  });

  const searchTextColor = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['#FFFFFF', '#000000'], // White to black
    extrapolate: 'clamp',
  });
  const searchPlaceholderTextColor = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['#fff', '#121212'], // White to black
    extrapolate: 'clamp',
  });
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: headerBackgroundOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['#6A66FF', '#FFFFFF'],
            }),
          },
        ]}>
        <Animated.View
          style={[
            {
              justifyContent: 'space-between',
              flexDirection: 'row',
              opacity: headerItemOpacity,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/PersonImage.png')}
                style={styles.image1}
                resizeMode="cover"
              />
            </View>

            <View style={{justifyContent: 'center'}}>
              <Text style={{fontWeight: '600', fontSize: 16, color: '#FFFFFF'}}>
                Hello Alex
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text
                  style={{fontWeight: '500', fontSize: 14, color: '#EEEEEE'}}>
                  Ahmedabad
                </Text>
                <ArrowIcon />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <View style={styles.iconContainer}>
              <NotificationIcon />
            </View>
            <View style={styles.iconContainer}>
              <HameBurgerIcon />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            {
              marginTop: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              transform: [{translateY: searchBarTranslateY}],
            },
          ]}>
          <View style={{width: '10%', height: 50, justifyContent: 'center'}}>
            <Animated.View
              style={[styles.logoContainer, {opacity: whiteLogoOpacity}]}>
              <Logo />
            </Animated.View>
            <Animated.View
              style={[styles.logoContainer, {opacity: blueLogoOpacity}]}>
              <BlueLogo />
            </Animated.View>
          </View>

          <Animated.View
            style={{
              backgroundColor: searchBgColor,
              borderRadius: 10,
              width: '70%',
              height: 50,
            }}>
            <AnimatedTextInput
              style={{
                flex: 1,
                paddingLeft: 10,
                fontSize: 16,
                color: searchTextColor,
              }}
              placeholder="Search Anything..."
              placeholderTextColor={searchPlaceholderTextColor}
              value={input}
              onChangeText={setInput}
            />
          </Animated.View>

          <TouchableOpacity
            onPress={handleSearch}
            style={{
              height: 50,
              backgroundColor: '#9ca2ff',
              borderRadius: 10,
              padding: 10,
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchIcon />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <ScrollView contentContainerStyle={{paddingBottom:100}}
        style={{marginHorizontal: 16, }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <Text
          style={{
            fontFamily: 'BricolageGrotesque_24pt-Regular',
            fontSize: 20,
            fontWeight: '600',
            paddingVertical: 20,
            color: '#2A2A2A',
          }}>
          Featured Events
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 160,
              height: 180,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 160,
              height: 180,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 160,
              height: 180,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 160,
              height: 180,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
        </ScrollView>
        <Text
          style={{
            fontFamily: 'BricolageGrotesque_24pt-Regular',
            fontSize: 20,
            fontWeight: '600',
            paddingVertical: 20,
            color: '#2A2A2A',
          }}>
          Upcoming Events
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        <EventCard
      imageUrl={require('../assets/UpcomingEventImage.png')}
      title="Music Show 1.0"
      date="4 March, 2025"
      time="9 AM onwards"
      location="Square Game Hub"
      likes="476k"
      comments="14k"
      tags={["Music", "Drum Show"]}
      userAvatar={require('../assets/PersonImage.png')}
      performers={[
        require('../assets/PersonImage.png'),
        require('../assets/PersonImage.png'),
        require('../assets/PersonImage.png')
      ]}
    />
      
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image1: {
    height: '100%',
    width: '100%',
  },
  profileContainer: {
    aspectRatio: 1,
    width: 40,
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconContainer: {
    backgroundColor: '#9ca2ff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  header: {
    // backgroundColor: '#6A66FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 25,
    width: '100%',
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
