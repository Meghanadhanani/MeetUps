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
import PlusIcon from '../assets/svgs/PlusIcon.svg';
import SearchIcon from '../assets/svgs/search.svg';
import EventCard from '../common/EventCard';
import axios from 'axios';
import {GET_EVENTLIST_API, GET_FEATURED_EVENTS_API, GET_PAST_EVENTS_API} from '../utils/ApiHelper';
import {useFocusEffect} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {getUserToken} from '../utils/UtilFunctions';
import Loader from '../utils/Loader';
import { isDebug } from '../utils/StorageUtils';
import AnimatedHeader from './AnimatedHeader';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const PastEventScreen = ({navigation}) => {
const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState();
const [featuredEvent, setFeaturedEvent] = useState([])

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);




  useFocusEffect(
    useCallback(() => {
      // Show/hide tab bar based on bottom sheet state
      navigation.getParent()?.setOptions({
        tabBarStyle: isBottomSheetOpen ? { display: 'none' } : undefined
      });
    }, [isBottomSheetOpen, navigation])
  );


  const handleSearch = () => {
    setQuery(input);
  };

  const GetEventList = async () => {
    try {
      isDebug && console.log('fetching data started');

      setLoading(true);
      const token = await getUserToken();
      const resposne = await axios.get(GET_PAST_EVENTS_API, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', // Fixed: was multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      });

      isDebug && console.log('resposne of past events', resposne.data.past_featured_events
);
      setEvents(resposne.data.past_featured_events);
    } catch (error) {
      console.log('Error fetching event list:', error);
    } finally {
      setLoading(false);
    }
  };
 useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: isBottomSheetOpen ? { display: 'none' } : undefined
      });
    }, [isBottomSheetOpen, navigation])
  );

useFocusEffect(
  useCallback(() => {
    GetEventList(); 
  }, [])
);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      throttle: 16,
    },
  );
  const handlePress = () => {
    navigation.navigate('EventDetailScreen', {events: item});
  };
  return (
      <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          {/* <Animated.View
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
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => navigation.navigate('CreateEventScreen')}>
                  <PlusIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <NotificationIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <HameBurgerIcon />
                </TouchableOpacity>
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

              <Animated.View
                style={[
                  styles.iconContainer,
                  {backgroundColor: searchIconBgColor},
                ]}>
                <TouchableOpacity onPress={handleSearch} hitSlop={20}>
                  <SearchIcon />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Animated.View> */}
  <AnimatedHeader
            navigation={navigation}
            scrollY={scrollY}
            input={input}
            setInput={setInput}
            onSearch={handleSearch}
          />
          <Animated.ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sectionTitle}>Past Events</Text>
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
                renderItem={({item}) => (
                  <EventCard item={item} navigation={navigation} setIsBottomSheetOpen={setIsBottomSheetOpen}/>
                )}
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
            {/* {isDebug && console.log('length', events.length === 0)} */}
            {loading && events.length === 0 && <Loader />}
          </Animated.ScrollView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default PastEventScreen


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
    fontFamily: 'BricolageGrotesque_24pt-Regular',
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