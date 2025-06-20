// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const CreateEventScreen = () => {
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
//       <Text style={styles.title}>CreateEventScreen</Text>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CreateEventScreen;

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

import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomBackBtn from '../common/CustomBackBtn';
import ShareBtn from '../assets/svgs/ShareBtn.svg';
import {CREATE_EVENT_API, GET_EVENTLIST_BYID_API} from '../utils/ApiHelper';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import CalenderIcon from '../assets/svgs/Calender.svg';
import LocationIcon from '../assets/svgs/LocationBlueIcon.svg';
import ClockIcon from '../assets/svgs/ClockBlueIcon.svg';
import LanguageIcon from '../assets/svgs/Language.svg';
import PetAllowanceIcon from '../assets/svgs/PetAllowanceIcon.svg';
import BlueLogo from '../assets/svgs/LogoInBlue.svg';
import TagIcon from '../assets/svgs/TagIcon.svg';
import PlusIcon from '../assets/svgs/PlusIcon.svg';
import LayoutIcon from '../assets/svgs/layoutIcon.svg';
import SeatIcon from '../assets/svgs/SeatIcon.svg';
import LinkedInIcon from '../assets/svgs/LinkedIn.svg';
import TwitterIcon from '../assets/svgs/TwitterIcon.svg';
import UserNameIcon from '../assets/svgs/UserNameIcon.svg';
import InstaIcon from '../assets/svgs/InstaIcon.svg';
import PersonIcon from '../assets/svgs/UploadPersonIcon.svg';
import AgeIcon from '../assets/svgs/AgeIcon.svg';
import RetryIcon from '../assets/svgs/RetryIcon.svg';
import CameraUploadIcon from '../assets/svgs/CameraUploadIcon.svg';
import ReUploadCameraIcon from '../assets/svgs/ReUploadCameraIcon.svg';
import RupeeIcon from '../assets/svgs/RupeeIcon.svg';
import QRCodeIcon from '../assets/svgs/QRCodeIcon.svg';
import DeleteIcon from '../assets/svgs/DeleteIcon.svg';
import {
  formatDate,
  formatDescription,
  formatTime,
  getUserToken,
} from '../utils/UtilFunctions';
import {
  showToastMSGError,
  showToastMSGInfo,
  showToastMSGWarning,
} from '../utils/ToastMessages';
import {StorageUtils} from '../utils/StorageUtils';

import {launchImageLibrary} from 'react-native-image-picker';

const CreateEventScreen = ({navigation}) => {
  const [eventName, setEventName] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [hosts, setHosts] = useState([{id: Date.now()}]);
  const [userToken, setUserToken] = useState();
  const [bannerImage, setBannerImage] = useState(null);

const handleImageUpload = () => {
  launchImageLibrary(
    { mediaType: 'photo', quality: 1 },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setBannerImage(asset); // ✅ Save whole object now
        console.log('Selected Image:', asset);
      }
    },
  );
};

  const addHost = () => {
    if (hosts.length === 3) {
      showToastMSGWarning('Limit Notice, You can add only one more host.');
    }
    if (hosts.length === 4) {
      setHosts(prev => [...prev, {id: Date.now()}]);
    } else if (hosts.length < 4) {
      setHosts(prev => [...prev, {id: Date.now()}]);
    } else if (hosts.length >= 5) {
    }
  };

  const removeHost = id => {
    setHosts(prev => prev.filter(host => host.id !== id));
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const CreateEventApi = async () => {
   const token = await getUserToken();
   
    console.log('userrrrrrrr tokennnnnn', token); // ✅ now this will be correct
    
    const formData = new FormData();
     formData.append("event_name", eventName)
    formData.append('host_names', 'Meghana Dhanani');
    formData.append('pet_allowance', 'No');
    formData.append('description', 'This is a test event');
    formData.append('event_date', '2025-06-18');
    formData.append('event_time', '18:00');
    formData.append('location', 'Ahmedabad');
    formData.append('is_virtual', true);
    formData.append('is_free', true);
//    if (bannerImage) {
//   formData.append('event_images', {
//     uri: bannerImage.uri,
//     type: bannerImage.type,
//     name: bannerImage.fileName || 'banner.jpg',
//   });
// }

    console.log("fffffffffffffiiiiiiiiiiiiiiiiiiiiiii",bannerImage);
    
    try {
      const response = await axios.post(CREATE_EVENT_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // if needed
        },
      });
      console.log('respones of create event api', response.data);
      if (response.status == 201) {
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      console.log('errrrrrrrrrrr', error.response.data);
      showToastMSGError(error.response.data);
    }
  };
  // useEffect(() => {
  //   CreateEventApi()

  // }, [])

  return (
    <View style={styles.container}>
      <CustomBackBtn
        iconName={[
          {icon: <RetryIcon />, onPress: () => console.log('Share')},
          {icon: <DeleteIcon />, onPress: () => console.log('Settings')},
        ]}
        // title={showTitle ? events.event_name : undefined}
      />
      <ScrollView
        style={{paddingHorizontal: 16}}
        contentContainerStyle={{gap: 16, paddingTop: 16, paddingBottom: 20}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#F1F0FF',
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            gap: 10,
            elevation: 1,
          }}>
          <TouchableOpacity onPress={handleImageUpload} activeOpacity={0.8}>
            <View
              style={{
                height: 360,
                backgroundColor: '#ECEFFF',
                borderRadius: 10,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {bannerImage ? (
                <View
                  style={{
                    height: 360,
           
                    borderRadius: 10,
                    overflow: 'hidden',
                    width: '100%',
                    borderColor: '#F1F0FF',
                    borderWidth: 1,

                    gap: 10,
                    elevation: 10,
                  }}>
                  <Image
                    source={{uri: bannerImage}}
                    style={{width: '100%', height: '100%'}}
                    // resizeMode="cover"
                  />
                  <View style={{backgroundColor:"#FFFFFF",borderRadius:99, padding:10, zIndex:999, position: "absolute",bottom:5,right: 5, elevation: 1,borderColor: '#F1F0FF',
                    borderWidth: 1,}}>


                  <ReUploadCameraIcon />
                  </View>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#7975FF',
                      borderRadius: 6,
                      gap: 5,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                    }}>
                    <CameraUploadIcon />
                    <Text style={{color: '#FFFFFF', fontSize: 13}}>
                      Upload Banner
                    </Text>
                  </View>

                  <Text style={{color: '#9CA2FF', fontSize: 13, marginTop: 10}}>
                    Suggested Size
                  </Text>
                  <Text style={{color: '#9CA2FF', fontSize: 13}}>
                    341 x 360
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          <TextInput
            style={{
              fontSize: 18,
              fontFamily: 'BricolageGrotesque_24pt-Regular',
              fontWeight: 500,
              // backgroundColor:"red"
              color: '#4A4A4A',
            }}
            numberOfLines={2}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Event Name"
            placeholderTextColor={'#A3A3A3'}
          />
        </View>
        <View style={styles.sectionCon}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BricolageGrotesque_24pt-Regular',
                fontWeight: 500,
                color: '#2A2A2A',
              }}>
              Event Details
            </Text>
            <View style={styles.container1}>
              <Text style={[styles.label, !isEnabled && styles.activeText]}>
                Offline
              </Text>

              <Switch
                trackColor={{false: '#E4E0FF', true: '#E4E0FF'}}
                thumbColor="#6D5CFF"
                ios_backgroundColor="#ccc"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />

              <Text style={[styles.label, isEnabled && styles.activeText]}>
                Online
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <CalenderIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="DD-MM-YYYY"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <ClockIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <LocationIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Add Location"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <TagIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Event Tags"
              placeholderTextColor="#A3A3A3"
            />
          </View>
        </View>
        <View style={styles.sectionCon}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BricolageGrotesque_24pt-Regular',
                fontWeight: 500,
                color: '#2A2A2A',
              }}>
              Event Pricing
            </Text>
            <View style={styles.container1}>
              <Text style={[styles.label, !isEnabled && styles.activeText]}>
                Free
              </Text>

              <Switch
                trackColor={{false: '#E4E0FF', true: '#E4E0FF'}}
                thumbColor="#6D5CFF"
                ios_backgroundColor="#ccc"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />

              <Text style={[styles.label, isEnabled && styles.activeText]}>
                Paid
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <RupeeIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Ticket Price"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <QRCodeIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Upload UPI QR Code"
              placeholderTextColor="#A3A3A3"
            />
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

          <TextInput
            style={styles.input}
            placeholder="The event is going to be the finest...."
            placeholderTextColor="#A3A3A3"
            multiline={true}
            numberOfLines={4} // optional, defines initial height
            textAlignVertical="top" // aligns text at the top
          />
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
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <LanguageIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Language"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <ClockIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Duration"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <SeatIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Seating"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <LayoutIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Layout"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <PetAllowanceIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Pet Allowance"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              <AgeIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Min. Age"
              placeholderTextColor="#A3A3A3"
            />
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
            Event Gallery
          </Text>

          <View style={styles.divider} />
          <View
            style={{
              height: 200,
              backgroundColor: '#ECEFFF',
              borderRadius: 10,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              // gap:10
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                backgroundColor: '#7975FF',
                borderRadius: 6,
                gap: 5,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
              <PlusIcon />
              <Text style={{color: '#FFFFFF', fontSize: 13}}>Add Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCon}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BricolageGrotesque_24pt-Regular',
                fontWeight: 500,
                color: '#2A2A2A',
                alignItems: 'center',
              }}>
              Host Details
            </Text>
            <TouchableOpacity
              onPress={addHost}
              activeOpacity={0.5}
              disabled={hosts.length >= 5}
              style={{
                flexDirection: 'row',
                backgroundColor: hosts.length >= 5 ? '#D3D3D3' : '#7975FF',
                borderRadius: 6,
                gap: 5,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
              <PlusIcon />
              <Text style={{color: '#FFFFFF', fontSize: 13}}>Add Host</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          {hosts.map((host, index) => (
            <View key={host.id} style={{gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#4A4A4A', fontSize: 16}}>
                  Host {index + 1}
                </Text>
                {hosts.length > 1 && index !== 0 && (
                  <TouchableOpacity
                    onPress={() => removeHost(host.id)}
                    style={{alignSelf: 'flex-end', marginBottom: 8}}>
                    <DeleteIcon />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <PersonIcon />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Upload Photo"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <UserNameIcon />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <InstaIcon />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Instagram URL"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <LinkedInIcon />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="LinkedIn URL"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    backgroundColor: '#F5F6FF',
                    borderRadius: 12,
                    padding: 10,
                  }}>
                  <TwitterIcon />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="X/Twitter URL"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={CreateEventApi}
          style={{
            backgroundColor: '#6D5CFF',
            paddingVertical: 14,
            paddingHorizontal: 10,
            borderRadius: 12,
            elevation: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: 600,
              textAlign: 'center',
            }}>
            Save & Publish
          </Text>
        </TouchableOpacity>
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
    </View>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  footerText: {
    fontSize: 16,
    color: '#6A6A6A',
    fontWeight: 500,
    fontFamily: 'Savate-Black',
  },
  sectionCon: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F0FF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    elevation: 1,
  },
  iconWrapper: {
    backgroundColor: '#F5F6FF',
    borderRadius: 12,
    padding: 10,
  },
  divider: {borderColor: '#F1F0FF', borderWidth: 0.5},
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#A3A3A3',
  },
  activeText: {
    color: '#6D5CFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
});
