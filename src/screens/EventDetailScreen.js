import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomBackBtn from '../common/CustomBackBtn';
import ShareBtn from '../assets/svgs/ShareBtn.svg';
import {GET_EVENTLIST_BYID_API} from '../utils/ApiHelper';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import CalenderIcon from '../assets/svgs/Calender.svg';
import LocationIcon from '../assets/svgs/LocationBlueIcon.svg';
import ClockIcon from '../assets/svgs/ClockBlueIcon.svg';
import LanguageIcon from '../assets/svgs/Language.svg';
import PetAllowanceIcon from '../assets/svgs/PetAllowanceIcon.svg';
import BlueLogo from '../assets/svgs/LogoInBlue.svg';

import LayoutIcon from '../assets/svgs/layoutIcon.svg';

import AgeIcon from '../assets/svgs/AgeIcon.svg';

import SeatIcon from '../assets/svgs/SeatIcon.svg';

import {
  formatDate,
  formatDescription,
  formatTime,
} from '../utils/UtilFunctions';
const EventDetailScreen = ({route}) => {
  const {event} = route.params;
  const [events, setEvents] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const isFocused = useIsFocused();
  // console.log('eventtttttttttttttttt', event);
  const GetEventList = async () => {
    try {
      const resposne = await axios.get(`${GET_EVENTLIST_BYID_API}/${event}`);
      console.log('resposne of idddd', resposne.data);
      setEvents(resposne.data);
    } catch (error) {
      console.error('Error fetching event list:', error);
    }
  };
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  useFocusEffect(
    useCallback(() => {
      GetEventList();
      return () => {};
    }, [isFocused]),
  );
  const formatHostNames = hosts => {
    if (!hosts || hosts.length === 0) return '';
    if (hosts.length === 1) return hosts[0];
    if (hosts.length === 2) return `${hosts[0]} & ${hosts[1]}`;
    const allExceptLast = hosts.slice(0, -1).join(', ');
    const last = hosts[hosts.length - 1];
    return `${allExceptLast} & ${last}`;
  };
  const handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Adjust this threshold based on when you want the title to appear
    // 450 is approximately when the event name section starts to scroll up
    const threshold = 450;

    if (scrollY > threshold && !showTitle) {
      setShowTitle(true);
    } else if (scrollY <= threshold && showTitle) {
      setShowTitle(false);
    }
  };
  return (
    <View style={styles.container}>
      <CustomBackBtn
        iconName={[{icon: <ShareBtn />, onPress: () => console.log('Share')}]}
        title={showTitle ? events.event_name : undefined}
      />
      <ScrollView
        style={{paddingHorizontal: 16}}
        contentContainerStyle={{gap: 16, paddingTop: 16, paddingBottom: 80}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            // height: 516,
            borderColor: '#F1F0FF',
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            gap: 16,
            elevation: 1,
          }}>
          <View
            style={{
              height: 360,
              backgroundColor: 'red',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={require('../assets/EventDumyImage.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
            }}
            numberOfLines={2}>
            {events.event_name}
          </Text>
          <View
            style={{borderColor: '#F1F0FF', borderWidth: 0.5, width: '100%'}}
          />
          <View style={styles.attendeesContainer}>
            <Image
              source={require('../assets/PersonImage.png')}
              style={styles.attendeeAvatar}
            />
            <Image
              source={require('../assets/PersonImage.png')}
              style={[styles.attendeeAvatar, {marginLeft: -10}]}
            />

            <Text style={styles.attendeeCount}>
              Hosted by {formatHostNames(events.host_names)}
            </Text>
          </View>
        </View>
        <View style={styles.sectionCon}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              color: '#2A2A2A',
            }}>
            Details
          </Text>
          <View style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <CalenderIcon />
            </View>
            <Text style={styles.detailText}>
              {formatDate(events.event_date)} | {formatTime(events.event_time)}
            </Text>
          </View>

          <View
            style={{
              gap: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <LocationIcon />
            </View>
            <Text style={styles.detailText}>{events.location}</Text>
          </View>
        </View>
        <View style={styles.sectionCon}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              color: '#2A2A2A',
            }}>
            About Event
          </Text>
          <View style={styles.divider} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              color: '#6D6D6D',
            }}>
            {formatDescription(events.description || '', expanded, 150)}
            {events.description?.length > 150 && (
              <Text
                onPress={toggleExpanded}
                style={{
                  color: '#6D5CFF',
                  fontWeight: 700,
                  fontFamily: 'BricolageGrotesque_24pt-Regular',
                  textDecorationLine: 'underline',
                }}>
                {expanded ? 'Read Less' : 'Read More'}
              </Text>
            )}
          </Text>
        </View>
        <View style={styles.sectionCon}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              color: '#2A2A2A',
            }}>
            Additional Details
          </Text>
          <View style={styles.divider} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <LanguageIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Language</Text>
                  <Text>{events.language}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <ClockIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Duration</Text>
                  <Text>{events.duration}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <SeatIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Seating</Text>
                  <Text>{events.seating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <LayoutIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Layout</Text>
                  <Text>{events.layout}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <PetAllowanceIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Pet Allowance</Text>
                  <Text>{events.pet_allowance}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsSectionCon}>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <AgeIcon />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text>Min. Age</Text>
                  <Text>{events.age_limit}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sectionCon}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              color: '#2A2A2A',
            }}>
            Event Gallary
          </Text>
          <View style={styles.divider} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            <View style={styles.detailsSectionCon1}></View>
            <View style={styles.detailsSectionCon1}></View>
            <View style={styles.detailsSectionCon1}></View>
            <View style={styles.detailsSectionCon1}></View>
          </View>
          {/* {events.event_images?.map((imgUrl, index) => (
              <View key={index} style={styles.detailsSectionCon1}>
                <Image
                  source={{uri: imgUrl}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ))}  */}
        </View>
        <View style={styles.sectionCon}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              color: '#2A2A2A',
            }}>
            Hosts
          </Text>
          <View style={styles.divider} />
          <View style={{gap: 10}}>
            {events?.host_names?.map((hostName, index) => (
              <View key={index} style={styles.hostRow}>
                <Image
                  source={require('../assets/PersonImage.png')} // Fallback image
                  style={styles.hostImage}
                />
                <Text style={styles.hostName}>{hostName}</Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.footerText}>Powered by</Text>
          <View style={{height: 18}}>
            <BlueLogo height={18} />
          </View>
          <Text
            style={[styles.footerText, {color: '#6D5CFF', fontWeight: 600}]}>
            SOCIALIST
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          bottom: 0,
          width: '100%',
          elevation: 10,
        }}>
        <View style={{width: '40%'}}>
          <Text style={{color: '#4A4A4A', fontSize: 14, fontWeight: 400}}>
            Ticket Price
          </Text>
          <Text style={{color: '#2A2A2A', fontSize: 20, fontWeight: 500}}>
            ₹ {events.ticket_price}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            backgroundColor: '#6D5CFF',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 8,
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 16}}>Book Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#FAFAFA',
  },
  footerText: {
    fontSize: 16,
    color: '#6A6A6A',
    fontWeight: 500,
    fontFamily: 'Savate-Black',
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // or use marginRight if 'gap' not supported
  },

  hostImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },

  hostName: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'BricolageGrotesque_24pt-Regular', // Or any other working font
  },

  divider: {borderColor: '#F1F0FF', borderWidth: 0.5},
  detailsSectionCon: {width: '48%'},
  detailsSectionCon1: {
    width: '48%',
    height: 180,
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  sectionCon: {
    // height: 164,
    backgroundColor: '#FFFFFF',
    // height: 516,
    borderColor: '#F1F0FF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    elevation: 1,
  },
  detailText: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: 500,
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
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'BricolageGrotesque_24pt-Regular',
  },
});
