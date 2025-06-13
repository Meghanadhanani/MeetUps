import {Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import FillHeartIcon from '../assets/svgs/FillHeartIcon.svg';
import SaveIcon from '../assets/svgs/SaveIcon.svg';
import TimerIcon from '../assets/svgs/TimerIcon.svg';
import LocationIcon from '../assets/svgs/LocationIcon.svg';
import CommentIcon from '../assets/svgs/CommentICon.svg';
import VerifiedIcon from '../assets/svgs/Verified.svg';
import DotsIcon from '../assets/svgs/3Dots.svg';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({item, navigation}) => {

const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['65%', '75%', '80%'], []);
// const navigation =useNavigation()
  const handlePresentModalPress = useCallback(() => {
    console.log("Opening sheet...");
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' onwards';
};
const handlePress = () => {
  navigation.navigate('EventDetailScreen', {event: item});
};
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View style={styles.cardContainer}>
          <View style={styles.userHeader}>
            <View style={styles.userInfo}>
              <Image
                source={require('../assets/PersonImage.png')}
                style={styles.userAvatar}
              />
              <View>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>Jack_Drums</Text>
                  <VerifiedIcon width={16} height={16} />
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.moreOptions}>⋮</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: 1, backgroundColor: '#F1F0FF', marginVertical: 10}}
          />
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/UpcomingEventImage.png')}
                style={styles.eventImage}
                resizeMode="cover"
              />
            </View>

            {/* <View style={styles.tagContainer}> */}
              <ScrollView horizontal contentContainerStyle={styles.tagContainer} showsHorizontalScrollIndicator={false}  >

              {item.tags &&
                item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                </ScrollView>
            {/* </View> */}

            <Text style={styles.eventTitle}>{item.event_name}</Text>

            <View style={styles.eventDetails}>
              <View style={styles.detailItem}>
                <TimerIcon width={16} height={16} color="#6A66FF" />
                <Text style={styles.detailText}>
                  {formatDate(item.event_date) || '4 March, 2025'} | {formatTime(item.event_time) || '9 AM onwards'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <LocationIcon width={16} height={16} color="#6A66FF" />
                <Text style={styles.detailText}>
                  {item.location || 'Square Game Hub'}
                </Text>
              </View>
            </View>

            <View style={styles.engagementContainer}>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.engagementItem}>
                  <FillHeartIcon
                    width={20}
                    height={20}
                    color="#6A66FF"
                    // fill="#6A66FF"
                  />
                  <Text style={styles.engagementText}>{'476k'}</Text>
                </View>
                <View style={styles.engagementItem}>
                  <CommentIcon width={20} height={20} color="#6A66FF" />
                  <Text style={styles.engagementText}>{'14k'}</Text>
                </View>
                <View style={styles.engagementItem}>
                  <TouchableOpacity onPress={handlePresentModalPress}   hitSlop={20}
                  >
                    <SaveIcon width={20} height={20} color="#6A66FF" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.attendeesContainer}>
                <Image
                  source={require('../assets/PersonImage.png')}
                  style={styles.attendeeAvatar}
                />
                <Image
                  source={require('../assets/PersonImage.png')}
                  style={[styles.attendeeAvatar, {marginLeft: -10}]}
                />
                <Image
                  source={require('../assets/PersonImage.png')}
                  style={[styles.attendeeAvatar, {marginLeft: -10}]}
                />
                <Text style={styles.attendeeCount}>+40k</Text>
              </View>
            </View>
          </View>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>Hello from Bottom Sheet 👋</Text>
            <Button title="Close" onPress={handleClosePress} />
          </BottomSheetView>
        </BottomSheetModal>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#F1F0FF",
    paddingVertical: 10,
    overflow: 'hidden',
    // elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#2A2A2A',
  },
  moreOptions: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A2A2A',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tag: {
    backgroundColor: '#EDEBFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  tagText: {
    color: '#6A66FF',
    fontSize: 12,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A2A2A',
    fontFamily: 'BricolageGrotesque_24pt-Regular',
  },
  eventDetails: {
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#4A4A4A',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'BricolageGrotesque_24pt-Regular',
  },
  engagementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  engagementText: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'BricolageGrotesque_24pt-Regular',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
  },
  attendeeCount: {
    marginLeft: 5,
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'BricolageGrotesque_24pt-Regular',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
  bottomSheetBackground: {
    backgroundColor: '#e8f4ff',
    borderRadius: 25,
  },
  bottomSheetIndicator: {
    backgroundColor: '#3498db',
    width: 40,
    height: 5,
  },
});

export default EventCard;