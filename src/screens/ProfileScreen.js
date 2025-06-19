// import {Image, StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const ProfileScreen = ({route}) => {
//   const {item} = route.params;
//   console.log('------------', item);

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
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // remove saved user data
      navigation.replace('LoginScreen'); // navigate to login screen
    } catch (e) {
      console.error('Logout failed', e);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#6D5CFF',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
