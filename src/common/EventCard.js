import { BottomSheet } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CommentIcon from '../assets/svgs/CommentICon.svg';
import FillHeartIcon from '../assets/svgs/FillHeartIcon.svg';
import LocationIcon from '../assets/svgs/LocationIcon.svg';
import RedLikeIcon from '../assets/svgs/RedFillLike.svg';
import SaveIcon from '../assets/svgs/SaveIcon.svg';
import SaveFillIcon from '../assets/svgs/SavedFillIcon.svg';

import TimerIcon from '../assets/svgs/TimerIcon.svg';
import UnLikeHeartIcon from '../assets/svgs/UnLikeICon.svg';
import VerifiedIcon from '../assets/svgs/Verified.svg';
import {
  ADD_COMMENTS_API,
  ADD_FAVOURITE_API,
  ADD_SAVE_EVENTS_API,
  GET_COMMENTS_API,
  GET_SAVED_EVENTS_LIST_API,
  REMOVE_FAVOURITE_API,
} from '../utils/ApiHelper';
import { isDebug } from '../utils/StorageUtils';
import {
  formatDate,
  formatTime,
  formatTimeAgo,
  getUserToken,
} from '../utils/UtilFunctions';
import { useTabVisibility } from './TabVisibilityContext';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const EventCard = ({item, navigation, onBottomSheetClose,onFeaturedListRefresh}) => {
  // // console.log('bottom sheet close', onBottomSheetClose);
  //   useFocusEffect(
  //     useCallback(() => {
  //       onBottomSheetClose
  //       // GetFeaturedEvents();
  //       return () => {
  //         // setQuery('');
  //       };
  //     }, []),
  //   );

  const [isLiked, setIsLiked] = useState(item.is_liked || false);
  const [likeCount, setLikeCount] = useState(item.total_likes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const {setIsTabVisible} = useTabVisibility();
  const [addCommentText, setAddCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [total_comments, setTotalComments] = useState(0);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isSavedBottomSheetVisible, setIsSavedBottomSheetVisible] =
    useState(false);
  const [shouldOpenSavedBottomSheet, setShouldOpenSavedBottomSheet] =
    useState(false);

  const [isSaveEvents, setIsSaveEvents] = useState(item.is_saved || false);

  const handleLikeToggle = async () => {
    if (isLoading) return;

    isDebug && console.log('Like button pressed - Current state:', isLiked);

    const token = await getUserToken();
    if (!token) {
      isDebug && console.log('No auth token found');
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
        isDebug && console.log('Unliking event:', item.id);
        const response = await axios.post(
          `${REMOVE_FAVOURITE_API}/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        isDebug && console.log('Unlike response:', response.data);
      } else {
        isDebug && console.log('Liking event:', item.id);
        const response = await axios.post(
          `${ADD_FAVOURITE_API}/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        isDebug && console.log('Like response:', response.data);
      }
      
    } catch (error) {
      isDebug &&
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
      setTimeout(() => {
        onFeaturedListRefresh?.()
      }, 100);

    }
  };

  const handlePress = () => {
    navigation.navigate('EventDetailScreen', {events: item});
  };

  const showCommentsBottomSheet = () => {
    setIsCommentsVisible(true);
    setIsTabVisible(false);
  };

  const showSavedBottomSheet = () => {
    setIsSavedBottomSheetVisible(true);
    setIsTabVisible(false);
  };

  const hideCommentsBottomSheet = () => {
    setIsCommentsVisible(false);
    setIsTabVisible(true);
      onBottomSheetClose();  
  };

  const hideSavedBottomSheet = () => {
    setIsSavedBottomSheetVisible(false);
    setIsTabVisible(true);
  };

  const handleCommentPress = async () => {
    isDebug && console.log('presedddddddddddddddd');

    try {
      setIsLoading(true);
      isDebug &&
        console.log('URL being hit:', `${GET_COMMENTS_API}/${item.id}`);
      const response = await axios.get(`${GET_COMMENTS_API}/${item.id}`);
      isDebug && console.log('Comments response:', response.data);

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
        isDebug && console.log('total comments:', response.data.total_comments);
      }

      showCommentsBottomSheet();
    } catch (error) {
      isDebug &&
        console.log('Error handling comment press:', error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCommentPress = async () => {
    if (addCommentText.trim().length < 3) {
      isDebug && console.log('Comment must be at least 3 characters long');
      return;
    }

    const token = await getUserToken();
    if (!token) {
      isDebug && console.log('No auth token found');
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

      setAddCommentText('');

      // Refresh comments after adding
      const refreshResponse = await axios.get(`${GET_COMMENTS_API}/${item.id}`);
      if (refreshResponse.data && refreshResponse.data.comments) {
        const allcomments = refreshResponse.data.comments.map(comment => {
          return {
            text: comment.comment_text,
            commentedby: comment.user?.username || 'Unknown User',
            createdAt: comment.created_at || new Date().toISOString(),
            photo: comment.user?.photo || null,
          };
        });
        setTotalComments(refreshResponse.data.total_comments);
        setComments(allcomments);
      }
    } catch (error) {
      isDebug && console.log('Error adding comment:', error);
    }
  };

  const handleSaveEvents = async () => {
    const isNowSaved = !isSaveEvents; // what it will become
    isDebug && console.log('is now saved', isNowSaved);
    if (isNowSaved) {
      setShouldOpenSavedBottomSheet(true);
    }
    setIsSaveEvents(isNowSaved);
    try {
      const token = await getUserToken();

      const response = await axios.post(
        `${ADD_SAVE_EVENTS_API}/${item.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        getSavedEventsList();
        isDebug && console.log('res from saved api', response.data);
      }
    } catch (error) {
      setIsSaveEvents(!isNowSaved);

      isDebug && console.log('Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (shouldOpenSavedBottomSheet) {
      showSavedBottomSheet();
      setShouldOpenSavedBottomSheet(false);
    }
  }, [isSaveEvents]);

  const getSavedEventsList = async () => {
    try {
      const token = await getUserToken();
      isDebug && console.log('token from saved', token);

      const response = await axios.get(GET_SAVED_EVENTS_LIST_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      isDebug &&
        console.log(
          'ressss from saved eevetns list api: ',
          response.data.saved_events,
        );
      const defaultImage = require('../assets/UpcomingEventImage.png');

      if (response.data && response.data.saved_events) {
        const allsavedItems = response.data.saved_events
          .map(saveItem => {
            const hasImage =
              saveItem.event_images && saveItem.event_images.length > 0;
            return {
              text: saveItem.event_name,
              commentedby: saveItem.user?.username || 'Unknown User',
              createdAt: saveItem.created_at || new Date().toISOString(),
              photo: hasImage ? saveItem.event_images[0].url : defaultImage,
              eventDate: saveItem.event_date,
              eventTime: saveItem.event_time,
            };
          })
          .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

        setSavedItems(allsavedItems);
      }
    } catch (error) {
      isDebug && console.log('errrrr in getting saved evetns', error);
    }
  };

  useEffect(() => {
    // getSavedEventsList()
  }, []);

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
                source={{uri: item.event_images[0]?.url}}
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
                {formatDate(item.event_date) || '4 March, 2025'} |
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
                style={[styles.engagementItem]}
                onPress={handleLikeToggle}
                hitSlop={30}
                // disabled={isLoading}
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
                onPress={handleCommentPress}
                disabled={isLoading}>
                <CommentIcon width={20} height={20} color="#6A66FF" />
                <Text style={styles.engagementText}>
                  {item.total_comments || 0}
                </Text>
              </TouchableOpacity>
              <View style={styles.engagementItem}>
                <TouchableOpacity hitSlop={20} onPress={handleSaveEvents}>
                  {isSaveEvents ? (
                    <SaveFillIcon width={20} height={20} />
                  ) : (
                    <SaveIcon width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Comments BottomSheet */}
      <BottomSheet
        isVisible={isCommentsVisible}
        onBackdropPress={hideCommentsBottomSheet}
        backdropStyle={styles.bottomSheetBackdrop}
        modalProps={{
          statusBarTranslucent: true,
        }}>
        <View style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>
              Comments ({total_comments})
            </Text>
          </View>

          {/* Comments List */}
          <KeyboardAvoidingView
            style={styles.bottomSheetBody}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
              style={styles.commentsScrollView}
              contentContainerStyle={styles.commentsContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {comments.length === 0 ? (
                <View style={styles.noCommentsContainer}>
                  <Text style={styles.noCommentsText}>No comments yet.</Text>
                  <Text style={styles.noCommentsText}>
                    Start the conversation
                  </Text>
                </View>
              ) : (
                comments.map((comment, index) => (
                  <View key={index} style={styles.commentItem}>
                    <View style={styles.commentContent}>
                      <Image
                        source={
                          comment.photo
                            ? {uri: comment.photo}
                            : require('../assets/PersonImage.png')
                        }
                        style={styles.commentAvatar}
                      />
                      <View style={styles.commentTextContainer}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentUsername}>
                            {comment.commentedby}
                          </Text>
                          <Text style={styles.commentTime}>
                            {formatTimeAgo(comment.createdAt)}
                          </Text>
                        </View>
                        <Text style={styles.commentText}>{comment.text}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.commentLikeButton}>
                      <RedLikeIcon />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Input Section */}
            <View style={styles.inputContainer}>
              <Image
                source={require('../assets/PersonImage.png')}
                style={styles.inputAvatar}
              />
              <TextInput
                value={addCommentText}
                onChangeText={setAddCommentText}
                placeholder="Add a comment"
                placeholderTextColor={'#A3A3A3'}
                style={styles.textInput}
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={handleAddCommentPress}
                autoCorrect={false}
                autoCapitalize="sentences"
              />
              {addCommentText.length > 2 && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddCommentPress}
                  activeOpacity={0.8}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </BottomSheet>

      {/* Saved Events BottomSheet */}
      <BottomSheet
        isVisible={isSavedBottomSheetVisible}
        onBackdropPress={hideSavedBottomSheet}
        backdropStyle={styles.bottomSheetBackdrop}
        modalProps={{
          statusBarTranslucent: true,
        }}>
        <View style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>
              Collections ({savedItems.length})
            </Text>
          </View>

          {/* Content */}
          <KeyboardAvoidingView
            style={styles.bottomSheetBody}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
              style={styles.commentsScrollView}
              contentContainerStyle={styles.commentsContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {savedItems.length === 0 ? (
                <View style={styles.noCommentsContainer}>
                  <Text style={styles.noCommentsText}>No saved events yet</Text>
                  <Text style={styles.noCommentsText}>
                    Start saving your favorite events!
                  </Text>
                </View>
              ) : (
                savedItems.map((comment, index) => (
                  <View key={index} style={styles.commentItem}>
                    <View style={styles.commentContent}>
                      <Image
                        source={
                          typeof comment.photo === 'string'
                            ? {uri: comment.photo}
                            : comment.photo // this will be the local `require` fallback
                        }
                        style={styles.savedImage}
                      />
                      <View style={styles.commentTextContainer}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentText}>{comment.text}</Text>
                          <Text style={styles.commentTime}></Text>
                        </View>
                        <Text style={styles.commentUsername}>
                          {formatDate(comment.eventDate) || '4 March, 2025'} |{' '}
                          {formatTime(comment.eventTime) || '9 AM onwards'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.commentLikeButton}>
                      <SaveFillIcon />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </BottomSheet>
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
    fontWeight: '500',
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
  disabledButton: {
    opacity: 0.6,
  },
  // BottomSheet Styles
  bottomSheetBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: SCREEN_HEIGHT * 0.9,
    minHeight: SCREEN_HEIGHT * 0.7,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bottomSheetHandle: {
    width: 50,
    height: 3,
    backgroundColor: '#C4C4C4',
    borderRadius: 2,
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  bottomSheetBody: {
    flex: 1,
  },
  commentsScrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  commentsContainer: {
    paddingVertical: 15,
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  noCommentsText: {
    color: '#4A4A4A',
    fontSize: 16,
    textAlign: 'center',
  },
  commentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  savedImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  commentTextContainer: {
    flex: 1,
    gap: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  commentUsername: {
    color: '#4A4A4A',
    fontSize: 13,
    fontWeight: '600',
  },
  commentTime: {
    color: '#4A4A4A',
    fontSize: 13,
  },
  commentText: {
    color: '#2A2A2A',
    fontSize: 15,
    lineHeight: 20,
  },
  commentLikeButton: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#F7F7F7',
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 1,
  },
  inputAvatar: {
    width: 45,
    height: 45,
    borderRadius: 18,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    color: '#2A2A2A',
    maxHeight: 100,
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#6A66FF',
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventCard;
