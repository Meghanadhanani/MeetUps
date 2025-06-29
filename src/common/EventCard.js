import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CommentIcon from '../assets/svgs/CommentICon.svg';
import FillHeartIcon from '../assets/svgs/FillHeartIcon.svg';
import LocationIcon from '../assets/svgs/LocationIcon.svg';
import RedLikeIcon from '../assets/svgs/RedFillLike.svg';
import SaveIcon from '../assets/svgs/SaveIcon.svg';
import TimerIcon from '../assets/svgs/TimerIcon.svg';
import UnLikeHeartIcon from '../assets/svgs/UnLikeICon.svg';
import VerifiedIcon from '../assets/svgs/Verified.svg';
import {
  ADD_COMMENTS_API,
  ADD_FAVOURITE_API,
  GET_COMMENTS_API,
  REMOVE_FAVOURITE_API,
} from '../utils/ApiHelper';
import {
  formatDate,
  formatTime,
  formatTimeAgo,
  getUserToken,
} from '../utils/UtilFunctions';
import {useTabVisibility} from './TabVisibilityContext';
const EventCard = ({item, navigation}) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['75%', '80%'], []);
  const [isLiked, setIsLiked] = useState(item.is_liked || false);
  const [likeCount, setLikeCount] = useState(item.total_likes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const {setIsTabVisible} = useTabVisibility();
  const [addCommentText, setAddCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const handleLikeToggle = async () => {
    if (isLoading) return;

    console.log('Like button pressed - Current state:', isLiked);

    const token = await getUserToken();
    if (!token) {
      console.log('No auth token found');
      return;
    }

    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => (newIsLiked ? prev + 1 : Math.max(0, prev - 1)));

    setIsLoading(true);

    try {
      if (previousIsLiked) {
        console.log('Unliking event:', item.id);
        const response = await axios.post(
          `${REMOVE_FAVOURITE_API}/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Unlike response:', response.data);
      } else {
        console.log('Liking event:', item.id);
        const response = await axios.post(
          `${ADD_FAVOURITE_API}/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Like response:', response.data);
      }
    } catch (error) {
      console.log(
        'Error toggling like:',
        error.response?.data || error.message,
      );
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);

      if (error.response?.data?.error === 'You have already liked this event') {
        setIsLiked(true);
        setLikeCount(prev => (previousIsLiked ? prev : prev + 1));
      } else if (
        error.response?.data?.error === "You haven't liked this event yet"
      ) {
        setIsLiked(false);
        setLikeCount(prev => (previousIsLiked ? Math.max(0, prev - 1) : prev));
      }
    } finally {
      setIsLoading(false);
    }
  };
  const [total_comments, setTotalComments] = useState(0);
  const handlePress = () => {
    navigation.navigate('EventDetailScreen', {events: item});
  };
  const handleCommentPress = async () => {
    setIsTabVisible(false); // Hide tab
    bottomSheetModalRef.current?.present();
    try {
      setIsLoading(true);
      const response = await axios.get(`${GET_COMMENTS_API}/${item.id}`);
      console.log('Comments response:', response.data);
      if (response.data && response.data.comments) {
        const allcomments = response.data.comments.map(comment => {
          return {
            text: comment.comment_text,
            commentedby: comment.user?.username || 'Unknown User',
            createdAt: comment.created_at || new Date().toISOString(),
            photo: comment.user?.photo || null,
          };
        });
        setTotalComments(response.data.total_comments);
        setComments(allcomments);
        console.log('total comments:', response.data.total_comments);
      }
      bottomSheetModalRef.current?.present();
    } catch (error) {
      console.log('Error handling comment press:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSheetChanges = useCallback(
    index => {
      if (index === -1) {
        setIsTabVisible(true); // Show tab when sheet closes
      }
    },
    [setIsTabVisible],
  );

  const handleAddCommentPress = async () => {
    if (addCommentText.trim().length < 3) {
      console.log('Comment must be at least 3 characters long');
      return;
    }
    const token = await getUserToken();
    if (!token) {
      console.log('No auth token found');
      return;
    }
    try {
      const data = {
        comment_text: addCommentText,
      };
      const response = await axios.post(
        `${ADD_COMMENTS_API}/${item.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
setAddCommentText(''); // Clear input after adding comment
      // console.log('Comment added successfully:', response.data);
      handleCommentPress();
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={{marginBottom: 15}}>
      <View style={styles.cardContainer}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            {item.created_by?.photo ? (
              <Image
                source={{uri: item.created_by.photo}}
                style={styles.userAvatar}
              />
            ) : (
              <Image
                source={require('../assets/PersonImage.png')}
                style={styles.userAvatar}
              />
            )}

            <View>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>
                  {item.created_by?.username || 'Unknown User'}
                </Text>
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
            {item.event_images?.length > 0 ? (
              <Image
                source={{uri: item.event_images[0].url}}
                resizeMode="cover"
                style={styles.eventImage}
              />
            ) : (
              <Image
                source={require('../assets/UpcomingEventImage.png')}
                style={styles.eventImage}
                resizeMode="cover"
              />
            )}
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.tagContainer}
            showsHorizontalScrollIndicator={false}>
            {item.event_tags &&
              item.event_tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
          </ScrollView>

          <Text style={styles.eventTitle}>{item.event_name}</Text>

          <View style={styles.eventDetails}>
            <View style={styles.detailItem}>
              <TimerIcon width={16} height={16} color="#6A66FF" />
              <Text style={styles.detailText}>
                {formatDate(item.event_date) || '4 March, 2025'} |{' '}
                {formatTime(item.event_time) || '9 AM onwards'}
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
              <TouchableOpacity
                style={[
                  styles.engagementItem,
                  isLoading && styles.disabledButton, // Optional: add disabled styling
                ]}
                onPress={handleLikeToggle}
                hitSlop={30}
                disabled={isLoading}
                activeOpacity={0.7}>
                {isLiked ? (
                  <FillHeartIcon width={20} height={20} />
                ) : (
                  <UnLikeHeartIcon width={20} height={20} />
                )}
                <Text style={styles.engagementText}>{likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.engagementItem}
                hitSlop={20}
                onPress={handleCommentPress}>
                <CommentIcon width={20} height={20} color="#6A66FF" />
                <Text style={styles.engagementText}>{item.total_comments || 0}</Text>
              </TouchableOpacity>
              <View style={styles.engagementItem}>
                <TouchableOpacity hitSlop={20}>
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
        onChange={handleSheetChanges}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5} // Adjust to make it lighter/darker
          />
        )}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <TouchableOpacity
            style={{
              // marginBottom:60,
              position: 'absolute',
              bottom: 10,
              width: '100%',
              zIndex: 1,
              elevation: 1,
              backgroundColor: '#F7F7F7',
              paddingVertical: 6,
              paddingHorizontal: 10,
              flexDirection: 'row',
              borderRadius: 50,
              alignItems: 'center',
              gap: 10,
              // justifyContent: 'space-between',
            }}
            // onPress={handleClosePress}
          >
            <Image
              source={require('../assets/PersonImage.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            />
            <TextInput
              placeholder="Add Your Comment"
              value={addCommentText}
              onChangeText={setAddCommentText}
              placeholderTextColor={'#4A4A4A'}
              style={{
                width: '70%',
                fontSize: 16,
                color: '#4A4A4A',
              }}
            />

            {addCommentText.length > 2 && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#6A66FF',
                padding: 10,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 1,
              }}
              onPress={handleAddCommentPress}>
              <Text style={{color: 'white'}}>Add</Text>
            </TouchableOpacity>
            )} 
          </TouchableOpacity>

          <Text
            style={
              styles.bottomSheetText
            }>{`Comments (${total_comments})`}</Text>
          <ScrollView
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
            contentContainerStyle={{
              padding: 10,
              width: '100%',
              height: '100%',
              gap: 20,
              paddingBottom: 260,
              // backgroundColor:"red"
            }}>
            {comments.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  paddingVertical: 50,
                  gap: 10,
                }}>
                <Text
                  style={{textAlign: 'center', color: '#4A4A4A', fontSize: 16}}>
                  No comments yet.
                </Text>
                <Text
                  style={{textAlign: 'center', color: '#4A4A4A', fontSize: 16}}>
                  Start the conversation
                </Text>
              </View>
            )}
            {comments.map((comment, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    height: '100%',
                    gap: 10,
                    width: '90%',
                  }}>
                  <Image
                    source={
                      comment.photo
                        ? {uri: comment.photo}
                        : require('../assets/PersonImage.png')
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      elevation: 1,
                    }}
                  />
                  <View style={{gap: 5, width: '85%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text style={{color: '#4A4A4A', fontSize: 13}}>
                        {comment.commentedby}
                      </Text>
                      <Text style={{color: '#4A4A4A', fontSize: 13}}>
                        {formatTimeAgo(comment.createdAt)}
                      </Text>
                    </View>

                    <Text style={{color: '#2A2A2A', fontSize: 15}}>
                      {comment.text}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={{}}>
                  <RedLikeIcon />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {/* {comments.map((comment, index) => (
  <View key={index} style={styles.commentItem}>
    <Text>{comment.commentedby}</Text>
    <Text>{comment.text}</Text>
    <Image
      source={comment.photo ? {uri: comment.photo} : require('../assets/PersonImage.png')}
      style={styles.userAvatar} 
    />
  </View>
))} */}
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
    borderWidth: 1,
    borderColor: '#F1F0FF',
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
    elevation: 1,
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
    fontSize: 14,
    fontWeight: 500,
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
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  bottomSheetText: {
    fontSize: 18,
    // backgroundColor:"red",
    // marginBottom: 20,
    color: '#4A4A4A',
    fontSize: 15,
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    // paddingHorizontal:10
  },
  bottomSheetIndicator: {
    backgroundColor: '#777777',
    width: 50,
    height: 3,
  },
});

export default EventCard;
