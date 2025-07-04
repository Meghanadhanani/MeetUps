import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');
const imageSize = (width - 6) / 3;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('grid');
  const profileData = {
    profileImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
    username: 'john_doe',
    displayName: 'John Doe',
    website: 'www.johndoe.com',
    posts: 142,
    followers: 1234,
    following: 567,
    isFollowing: false,
    isPrivate: false,
  };
  const postsData = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  ];

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('userData');
            navigation.replace('LoginScreen');
          } catch (e) {
            console.error('Logout failed', e);
            Alert.alert('Error', 'Something went wrong while logging out.');
          }
        },
      },
    ]);
  };

  const renderStatsItem = (count, label) => (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderTabIcon = type => {
    const isActive = activeTab === type;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.activeTab]}
        onPress={() => setActiveTab(type)}>
        <View style={[styles.tabIcon, isActive && styles.activeTabIcon]}>
          {type === 'grid' ? (
            <View style={styles.gridIcon}>
              <View
                style={[styles.gridDot, isActive && styles.activeGridDot]}
              />
              <View
                style={[styles.gridDot, isActive && styles.activeGridDot]}
              />
              <View
                style={[styles.gridDot, isActive && styles.activeGridDot]}
              />
              <View
                style={[styles.gridDot, isActive && styles.activeGridDot]}
              />
            </View>
          ) : (
            <View
              style={[styles.reelsIcon, isActive && styles.activeReelsIcon]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderPostGrid = () => (
    <View style={styles.postsGrid}>
      {postsData.map((imageUrl, index) => (
        <TouchableOpacity key={index} style={styles.postItem}>
          <Image source={{uri: imageUrl}} style={styles.postImage} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <Image
              source={{uri: profileData.profileImage}}
              style={styles.profileImage}
            />
            <View style={styles.statsContainer}>
              {renderStatsItem(profileData.posts, 'Posts')}
              {renderStatsItem(profileData.followers, 'Followers')}
              {renderStatsItem(profileData.following, 'Following')}
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>{profileData.displayName}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabContainer}>
          {renderTabIcon('grid')}
          {renderTabIcon('reels')}
        </View>
        {renderPostGrid()}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EFEFEF',
  },
  headerIcon: {
    fontSize: 24,
    color: '#262626',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 28,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E8E',
    marginTop: 2,
  },
  profileInfo: {
    marginBottom: 12,
  },
  displayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  bio: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
    marginBottom: 4,
  },
  website: {
    fontSize: 14,
    color: '#00376B',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 6,
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  shareButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  contactButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 6,
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  highlightsContainer: {
    marginTop: 8,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  highlightCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightIcon: {
    fontSize: 24,
  },
  highlightText: {
    fontSize: 12,
    color: '#262626',
  },
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#EFEFEF',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#262626',
  },
  tabIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    width: 12,
    height: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridDot: {
    width: 5,
    height: 5,
    backgroundColor: '#8E8E8E',
    margin: 0.5,
  },
  activeGridDot: {
    backgroundColor: '#262626',
  },
  reelsIcon: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#8E8E8E',
    borderRadius: 3,
  },
  activeReelsIcon: {
    borderColor: '#262626',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  postItem: {
    width: imageSize,
    height: imageSize,
    marginBottom: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EFEFEF',
  },
});

// import {Image, StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const ProfileScreen = ({route}) => {
//   const {item} = route.params;
//   isDebug && console.log('------------', item);

//   return <View>
//    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
//           <Image
//             source={{ uri: "https://images.unsplash.com/photo-1509395176047-4a66953fd231" }}
//             style={{
//               width: '100%',
//               height: 200,
//               // backgroundColor: 'red',
//               resizeMode: 'conta',

//             }}
//           />
//           </View>
//           <Text>{item.description}</Text>
//           <Text>{item.event_name}</Text>
//           <Text>{item.date}</Text>
//           <Text>{item.time}</Text>
//           <Text>{item.host}</Text>
//     </View>;
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({});
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('userData'); // remove saved user data
//       navigation.replace('LoginScreen'); // navigate to login screen
//     } catch (e) {
//       console.error('Logout failed', e);
//       Alert.alert('Error', 'Something went wrong while logging out.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>ProfileScreen</Text>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 30,
//   },
//   logoutButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     backgroundColor: '#6D5CFF',
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
