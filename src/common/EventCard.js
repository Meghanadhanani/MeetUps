import axios from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
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
import { isDebug } from '../utils/StorageUtils';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const EventCard = ({item, navigation}) => {
  const [isLiked, setIsLiked] = useState(item.is_liked || false);
  const [likeCount, setLikeCount] = useState(item.total_likes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const {setIsTabVisible} = useTabVisibility();
  const [addCommentText, setAddCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [total_comments, setTotalComments] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
      isDebug && console.log(
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

  const handlePress = () => {
    navigation.navigate('EventDetailScreen', {events: item});
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsTabVisible(false);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      setIsTabVisible(true);
    });
  };

  const handleCommentPress = async () => {
    try {
      setIsLoading(true);
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
      
      showModal();
      
    } catch (error) {
      isDebug && console.log('Error handling comment press:', error);
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
                  
                ]}
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

      {/* Comments Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideModal}
        statusBarTranslucent={true}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={hideModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{translateY: slideAnim}],
              },
            ]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>
                Comments ({total_comments})
              </Text>
            </View>

            {/* Comments List */}
            <KeyboardAvoidingView 
              style={styles.modalBody}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <ScrollView
                style={styles.commentsScrollView}
                contentContainerStyle={styles.commentsContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {comments.length === 0 ? (
                  <View style={styles.noCommentsContainer}>
                    <Text style={styles.noCommentsText}>No comments yet.</Text>
                    <Text style={styles.noCommentsText}>Start the conversation</Text>
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
                  placeholderTextColor={"#A3A3A3"}
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
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: SCREEN_HEIGHT * 0.8,
    minHeight: SCREEN_HEIGHT * 0.6,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalHandle: {
    width: 50,
    height: 4,
    backgroundColor: '#C4C4C4',
    borderRadius: 2,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  modalBody: {
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
    marginBottom: 15,
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
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#F7F7F7',
    borderRadius:50,
    marginHorizontal:10,
    marginBottom:15,
    elevation: 1,
    // width: "50%",
  },
  inputAvatar: {
    width: 45,
    height: 45,
    borderRadius: 18,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    // paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: '#F5F5F5',
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