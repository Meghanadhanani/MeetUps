import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowIcon from '../assets/svgs/ArrowIcon.svg';
import DownArrowIcon from '../assets/svgs/DownArrow.svg';
import CreateEventLogo from '../assets/svgs/DRIP_18.svg';
import HameBurgerIcon from '../assets/svgs/HamBurger.svg';
import BlueLogo from '../assets/svgs/LogoInBlue.svg';
import Logo from '../assets/svgs/LogoSvg.svg';
import NotificationIcon from '../assets/svgs/notification.svg';
import SearchIcon from '../assets/svgs/search.svg';
import EventCard from '../common/EventCard';
import axios from 'axios';
import {GET_EVENTLIST_API} from '../utils/ApiHelper';
import {useFocusEffect} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const HomeScreen = ({navigation}) => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [events, setEvents] = useState([]);
  
  const handleSearch = () => {
    setQuery(input);
  };

  const GetEventList = async () => {
    try {
      const resposne = await axios.get(GET_EVENTLIST_API);
      console.log('resposne', resposne.data);
      setEvents(resposne.data);
    } catch (error) {
      console.error('Error fetching event list:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetEventList();
      return () => {};
    }, []),
  );

  const headerItemOpacity = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [160, 85],
    extrapolate: 'clamp',
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -70],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: ['#6A66FF', '#FFFFFF'],
    extrapolate: 'clamp',
  });

  const whiteLogoOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const blueLogoOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const searchBgColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['#9ca2ff', '#F6F6F6'],
    extrapolate: 'clamp',
  });
  
  const seatchIconBgColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['#9ca2ff', '#7975FF'],
    extrapolate: 'clamp',
  });

  const searchTextColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['#FFFFFF', '#000000'],
    extrapolate: 'clamp',
  });

  const searchPlaceholderTextColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['rgba(255,255,255,0.8)', 'rgba(18,18,18,0.6)'],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      throttle: 16,
    },
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.header,
              {
                height: headerHeight,
                backgroundColor: headerBackgroundColor,
              },
            ]}>
            <Animated.View
              style={[
                styles.headerTopRow,
                {
                  opacity: headerItemOpacity,
                },
              ]}>
              <View style={styles.profileRow}>
                <View style={styles.profileContainer}>
                  <Image
                    source={require('../assets/PersonImage.png')}
                    style={styles.image1}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.userInfoContainer}>
                  <Text style={styles.userGreeting}>Hello Alex</Text>
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Ahmedabad</Text>
                    <ArrowIcon />
                  </View>
                </View>
              </View>
              <View style={styles.iconsRow}>
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
                styles.searchBarContainer,
                {
                  transform: [{translateY: searchBarTranslateY}],
                },
              ]}>
              <View style={styles.logoWrapper}>
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
                style={[
                  styles.searchInputContainer,
                  {backgroundColor: searchBgColor},
                ]}>
                <AnimatedTextInput
                  style={[styles.searchInput, {color: searchTextColor}]}
                  placeholder="Search Anything..."
                  placeholderTextColor={searchPlaceholderTextColor}
                  value={input}
                  onChangeText={setInput}
                />
              </Animated.View>

              <TouchableOpacity
                onPress={handleSearch}
                style={[
                  styles.searchButton,
                  {backgroundColor: seatchIconBgColor},
                ]}>
                <SearchIcon />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Featured Events</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollView}>
              {[1, 2, 3, 4].map((item, index) => (
                <View key={index} style={styles.featuredEventCard}>
                  <Image
                    source={require('../assets/FeatureEvent.png')}
                    width={'100%'}
                    height={'100%'}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </ScrollView>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'center',
                  backgroundColor: '#ECEFFF',
                  borderRadius: 50,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}>
                <Text style={{color: '#6D5CFF', fontSize: 14}}>All</Text>
                <DownArrowIcon />
              </View>
            </View>

            <View style={{gap: 15}}>
              <FlatList
                data={events}
                renderItem={({item}) => <EventCard item={item} navigation={navigation} />}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>

            <View style={styles.createEventCard}>
              <Text style={styles.createText}>
                Want To Create Your Own Event?
              </Text>
              <CreateEventLogo width={'100%'} />
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateEventScreen')}
                style={{
                  backgroundColor: '#6D5CFF',
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 14,
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Create My First Event
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  createEventCard: {
    width: '100%',
    backgroundColor: '#DDE1FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  createText: {
    color: '#6D5CFF',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'BricolageGrotesque_24pt',
  },
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 25,
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 100,
    elevation: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  userInfoContainer: {
    justifyContent: 'center',
  },
  userGreeting: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#EEEEEE',
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  searchBarContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  logoWrapper: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
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
  searchInputContainer: {
    borderRadius: 10,
    width: '70%',
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100,
    gap: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontFamily: 'BricolageGrotesque_24pt-Regular',
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  horizontalScrollView: {
    flexGrow: 0,
  },
  featuredEventCard: {
    backgroundColor: '#9ca2ff',
    width: 160,
    height: 180,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  featuredEventText: {
    color: '#fff',
    fontSize: 18,
  },
});