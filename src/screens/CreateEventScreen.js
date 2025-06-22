import axios from 'axios';
import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AgeIcon from '../assets/svgs/AgeIcon.svg';
import CalenderIcon from '../assets/svgs/Calender.svg';
import CameraUploadIcon from '../assets/svgs/CameraUploadIcon.svg';
import ClockIcon from '../assets/svgs/ClockBlueIcon.svg';
import DeleteIcon from '../assets/svgs/DeleteIcon.svg';
import InstaIcon from '../assets/svgs/InstaIcon.svg';
import LanguageIcon from '../assets/svgs/Language.svg';
import LayoutIcon from '../assets/svgs/layoutIcon.svg';
import LinkedInIcon from '../assets/svgs/LinkedIn.svg';
import LocationIcon from '../assets/svgs/LocationBlueIcon.svg';
import LinkIcon from '../assets/svgs/Link.svg';
import BlueLogo from '../assets/svgs/LogoInBlue.svg';
import PetAllowanceIcon from '../assets/svgs/PetAllowanceIcon.svg';
import PlusIcon from '../assets/svgs/PlusIcon.svg';
import QRCodeIcon from '../assets/svgs/QRCodeIcon.svg';
import RetryIcon from '../assets/svgs/RetryIcon.svg';
import ReUploadCameraIcon from '../assets/svgs/ReUploadCameraIcon.svg';
import RupeeIcon from '../assets/svgs/RupeeIcon.svg';
import SeatIcon from '../assets/svgs/SeatIcon.svg';
import TagIcon from '../assets/svgs/TagIcon.svg';
import TwitterIcon from '../assets/svgs/TwitterIcon.svg';
import PersonIcon from '../assets/svgs/UploadPersonIcon.svg';
import UserNameIcon from '../assets/svgs/UserNameIcon.svg';
import CrossIcon from '../assets/svgs/CrossIcon.svg';
import CustomBackBtn from '../common/CustomBackBtn';
import {CREATE_EVENT_API} from '../utils/ApiHelper';
import {showToastMSGError, showToastMSGWarning} from '../utils/ToastMessages';
import {getUserToken} from '../utils/UtilFunctions';
// import {s} from 'react-native-size-matters';

const CloseIcon = () => <Text style={styles.closeIcon}>×</Text>;

const CreateEventScreen = ({navigation}) => {
  const [eventName, setEventName] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [hosts, setHosts] = useState([
    {id: 1, name: '', instagram: '', linkedin: '', twitter: ''},
  ]);
  const [address, setAddress] = useState('');
  const [pet_allowance, setPetAllowance] = useState('');
  const [language, setLanguage] = useState('');
  const [age, setAge] = useState('');
  const [seating, setSeating] = useState('');
  const [layout, setLayout] = useState('');
  const [duration, setDuration] = useState('');

  const [hostName, setHostName] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [location, setLocation] = useState('');
  const [ticket_price, setTicketPrice] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [eventTags, setEventTags] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [apiDate, setApiDate] = useState(''); // YYYY-MM-DD format for backend
  const [formattedTime, setFormattedTime] = useState('');
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirm = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const backendDate = `${year}-${month}-${day}`; // for backend
    const displayDate = `${day}-${month}-${year}`; // for UI

    setFormattedDate(displayDate); // Show DD-MM-YYYY to user
    setApiDate(backendDate); // Send YYYY-MM-DD to backend
    hideDatePicker();
  };

  const handleTimeConfirm = time => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // convert 0 to 12

    const formatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    setFormattedTime(formatted);
    hideTimePicker();
  };

  const CreateEventApi = async () => {
    const token = await getUserToken();
    console.log('is enable ', isFree.toString());
    console.log('is online ', isOnline.toString());
    const formData = new FormData();
    formData.append('event_name', eventName);
    hosts.forEach(host => {
      formData.append('host_names', host.name);
    });
formData.append("duration", duration);
    formData.append('age', age);
    formData.append('language', language);
    formData.append('seating', seating);
    formData.append('layout', layout);
    formData.append('address', address);
    formData.append('event_tags', tags);
    console.log('tags', tags);
    
    formData.append('pet_allowance', pet_allowance);
    formData.append('description', description);
    formData.append('event_date', apiDate);
    formData.append('event_time', formattedTime);

    // formData.append('location ', 'https://meet.google.com/xyz-123'); // Or Zoom link etc.

    formData.append('is_virtual', isOnline.toString());
    formData.append('is_free', isFree.toString());
    formData.append('ticket_price', isFree ? '0' : ticket_price); // Example price

    if (isOnline) {
      // For virtual event
      formData.append('location', 'https://zoom.us/j/xyz123');
    } else {
      // For offline event – must be a JSON string
      formData.append('location', address);
    }

    if (bannerImage) {
      formData.append('eventImages', {
        uri: bannerImage.uri,
        type: bannerImage.type,
        name: bannerImage.fileName || 'banner.jpg',
      });
    }

    try {
      const response = await axios.post(CREATE_EVENT_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // if needed
        },
      });
      console.log('respones of create event api', response.data);
      if (response.status == 201) {
        showToastMSGWarning('Event Created Successfully');
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      console.log('errrrrrrrrrrr', error.response.data);
      showToastMSGError(error.response.data.error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setBannerImage(asset);
        console.log('Selected Image:', asset);
      }
    });
  };

  const addHost = () => {
    if (hosts.length >= 5) {
      showToastMSGWarning('You can add a maximum of 5 hosts.');
      return;
    }

    if (hosts.length === 4) {
      showToastMSGWarning('Limit Notice, you can add only one more host.');
    }

    setHosts(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        instagram: '',
        linkedin: '',
        twitter: '',
      },
    ]);
  };

  const removeHost = id => {
    setHosts(prev => prev.filter(host => host.id !== id));
  };

  const toggleSwitch = () => setIsOnline(previousState => !previousState);
  const toggleSwitchFree = () => setIsFree(previousState => !previousState);

  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const removeTag = indexToRemove => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = () => {
    if (inputText.trim() && !tags.includes(inputText.trim().toLowerCase())) {
      setTags([...tags, inputText.trim().toLowerCase()]);
      setInputText('');
      setIsInputVisible(false);
    }
  };

  const handleInputSubmit = () => {
    addTag();
  };

  const showInput = () => {
    setIsInputVisible(true);
  };
  return (
    <View style={styles.container}>
      <CustomBackBtn
        iconName={[
          {icon: <RetryIcon />, onPress: () => console.log('Share')},
          {icon: <DeleteIcon />, onPress: () => console.log('Settings')},
        ]}
        onPress={() => navigation.goBack()}
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
                    source={{uri: bannerImage.uri}}
                    style={{width: '100%', height: '100%'}}
                    // resizeMode="cover"
                  />
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 99,
                      padding: 10,
                      zIndex: 999,
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      elevation: 1,
                      borderColor: '#F1F0FF',
                      borderWidth: 1,
                    }}>
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
              <Text style={[styles.label, !isOnline && styles.activeText]}>
                Offline
              </Text>

              <Switch
                trackColor={{false: '#E4E0FF', true: '#E4E0FF'}}
                thumbColor="#6D5CFF"
                ios_backgroundColor="#ccc"
                onValueChange={toggleSwitch}
                value={isOnline}
              />

              <Text style={[styles.label, isOnline && styles.activeText]}>
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
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#A3A3A3"
                value={formattedDate} // This should now show the selected date
                editable={false}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
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
            <TouchableOpacity onPress={showTimePicker} style={{flex: 1}}>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#A3A3A3"
                value={formattedTime}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,
              }}>
              {isOnline ? <LinkIcon /> : <LocationIcon />}
              {/* <LocationIcon /> */}
            </View>
            <TextInput
              style={styles.input}
              placeholder={
                isOnline
                  ? 'Enter Online Event Link (https)'
                  : 'Enter Event Location'
              }
              placeholderTextColor="#A3A3A3"
              value={address}
              onChangeText={setAddress}
              keyboardType={isOnline ? 'url' : 'default'}
              autoCapitalize={isOnline ? 'none' : 'words'}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ backgroundColor: '#F5F6FF',
                borderRadius: 12,
                padding: 10,}}>
              <TagIcon />
            </View>

            <View style={styles.tagsContainer}>
              {tags.length === 0 ? (
                <TextInput
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={handleInputSubmit}
                  placeholder="Event Tags"
                  placeholderTextColor="#A3A3A3"
                  returnKeyType="done"
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagsScrollContainer}>
                  {tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>#{tag}</Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeTag(index)}>
                        <CrossIcon />
                      </TouchableOpacity>
                    </View>
                  ))}

                  {isInputVisible ? (
                    <TextInput
                      style={styles.tagInput}
                      value={inputText}
                      onChangeText={setInputText}
                      onSubmitEditing={handleInputSubmit}
                      onBlur={() => {
                        if (inputText.trim()) {
                          addTag();
                        } else {
                          setIsInputVisible(false);
                        }
                      }}
                      placeholder="tag name"
                      placeholderTextColor="#A3A3A3"
                      autoFocus
                      returnKeyType="done"
                    />
                  ) : (
                    tags.length >= 1 && (
                      <TouchableOpacity
                        style={styles.tag}
                        onPress={showInput}>
                        <PlusIcon />
                      </TouchableOpacity>
                    )
                  )}
                </ScrollView>
              )}
            </View>
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
              <Text style={[styles.label, !isFree && styles.activeText]}>
                Free
              </Text>

              <Switch
                trackColor={{false: '#E4E0FF', true: '#E4E0FF'}}
                thumbColor="#6D5CFF"
                ios_backgroundColor="#ccc"
                onValueChange={toggleSwitchFree}
                value={isFree}
              />

              <Text style={[styles.label, isFree && styles.activeText]}>
                Paid
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          {isFree && (
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
                value={ticket_price}
                onChangeText={setTicketPrice}
                keyboardType="numeric"
              />
            </View>
          )}
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
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
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
              value={language}
              onChangeText={setLanguage}
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
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
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
              value={seating}
              onChangeText={setSeating}
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
              value={layout}
              onChangeText={setLayout}
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
              value={pet_allowance}
              onChangeText={setPetAllowance}
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
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
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
                  autoCapitalize="words"
                  placeholder="Full Name"
                  placeholderTextColor="#A3A3A3"
                  value={host.name}
                  onChangeText={text => {
                    const updatedHosts = [...hosts];
                    updatedHosts[index].name = text;
                    setHosts(updatedHosts);
                  }}
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
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  tagIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  tagsContainer: {
    flex: 1,
    // gap:10
  },
  tagsScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingRight: 10,
    gap:10,
    // backgroundColor:"red"
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7975FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap:10
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  removeButton: {
    // marginLeft: 4,
    // padding: 2,
  },
  closeIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#7975FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    minWidth: 80,
    maxWidth: 120,
  },
});
