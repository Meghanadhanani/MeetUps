import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// Import your icons for like, comment, etc.
import FillHeartIcon from '../assets/svgs/FillHeartIcon.svg';
import SaveIcon from '../assets/svgs/SaveIcon.svg';
import TimerIcon from '../assets/svgs/TimerIcon.svg';
import LocationIcon from '../assets/svgs/LocationIcon.svg';
import CommentIcon from '../assets/svgs/CommentICon.svg';
import VerifiedIcon from '../assets/svgs/Verified.svg';
import DotsIcon from '../assets/svgs/3Dots.svg';

const EventCard = ({
  imageUrl,
  title,
  date,
  time,
  location,
  likes,
  comments,
  performers,
  tags,
  userAvatar,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* User info header */}
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Image
            source={userAvatar || require('../assets/PersonImage.png')}
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
      {/* Event image */}
      <View style={{paddingHorizontal: 10,justifyContent: 'space-between',gap:10,}}>
        <View style={styles.imageContainer}>
          <Image
            source={imageUrl || require('../assets/UpcomingEventImage.png')}
            style={styles.eventImage}
            resizeMode="cover"
          />
        </View>

        {/* Event tags */}
        <View style={styles.tagContainer}>
          {tags &&
            tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
        </View>

        {/* Event title */}
        <Text style={styles.eventTitle}>{title || 'Music Show 1.0'}</Text>

        {/* Event date and location */}
        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <TimerIcon width={16} height={16} color="#6A66FF" />
            <Text style={styles.detailText}>
              {date || '4 March, 2025'} | {time || '9 AM onwards'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <LocationIcon width={16} height={16} color="#6A66FF" />
            <Text style={styles.detailText}>
              {location || 'Square Game Hub'}
            </Text>
          </View>
        </View>

        {/* Event engagement stats */}
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
                fill="#6A66FF"
              />
              <Text style={styles.engagementText}>{likes || '476k'}</Text>
            </View>
            <View style={styles.engagementItem}>
              <CommentIcon width={20} height={20} color="#6A66FF" />
              <Text style={styles.engagementText}>{comments || '14k'}</Text>
            </View>
            <View style={styles.engagementItem}>
              <SaveIcon width={20} height={20} color="#6A66FF" />
            </View>
          </View>
          <View style={styles.attendeesContainer}>
            {performers && performers.length > 0 ? (
              performers.map((performer, index) => (
                <Image
                  key={index}
                  source={performer}
                  style={[
                    styles.attendeeAvatar,
                    {marginLeft: index > 0 ? -10 : 0},
                  ]}
                />
              ))
            ) : (
              <>
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
              </>
            )}
            <Text style={styles.attendeeCount}>+40k</Text>
          </View>
        </View>
      </View>
    </View>
    
  );
};

// Example usage:

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 20,
    // marginTop: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
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
    // marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 10,
    // marginTop:5
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

    // marginBottom: 10,
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

    // marginTop: 5,
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
});

export default EventCard;
