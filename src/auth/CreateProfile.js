import axios from 'axios';
import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FemaleIcon from '../assets/svgs/FemaleIcon.svg';
import PasswordIcon from '../assets/svgs/Frame1.svg';
import MaleIcon from '../assets/svgs/MaleIcon.svg';
import ConfirmIcon from '../assets/svgs/Password.svg';
import PersionIcon from '../assets/svgs/Person.svg';
import {CREATE_PROFILE_API, LOGIN_API} from '../utils/ApiHelper';
import {StorageUtils} from '../utils/StorageUtils';
import {showToastMSGError, showToastMSGNormal} from '../utils/ToastMessages';
import {emailValidater} from '../utils/validations/emailValidater';
import {launchImageLibrary} from 'react-native-image-picker';
import {getUserToken} from '../utils/UtilFunctions';
const CreateProfile = ({navigation, route}) => {
  const {email} = route.params;
  const [loading, setLoading] = useState(false);
  const googleAuthData = useRef(null);
  const [name, setName] = useState({value: '', error: ''});
  const [city, setCity] = useState({value: '', error: ''});
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male');
  const [bannerImage, setBannerImage] = useState(null);

  const passwordInputRef = useRef(null);

  const handleEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
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
  const handleProfileCreate = async () => {
    try {
      console.log("email", email);
      
      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", name.value);
      formData.append("gender", selectedGender.toLowerCase());
      formData.append("city", city.value);
  
      if (bannerImage && bannerImage.uri) {
        formData.append("photo", {
          uri: bannerImage.uri,
          name: "profile.jpg",
          type: bannerImage.type || "image/jpeg",
        });
      }
      
     
      const response = await axios.put(CREATE_PROFILE_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },});
      if (response.data) {
              console.log('PRofile resposne', response.data);
              showToastMSGNormal(response.data.message);
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'SecureAccountScreen',
                    },
                  ],
                });
                
              }, 2000);
            } 
      console.log('res---------------', response.data);
    } catch (error) {
      console.log('errr', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require('../assets/DRIP_6.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Let’s Set Up Your Profile</Text>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={handleImageUpload}>
            <View
              style={{
                width: '30%',
                backgroundColor: '#E2DEFF',
                height: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: '#E2DEFF',
                elevation: 2,
              }}>
              {bannerImage ? (
                <Image
                  source={{uri: bannerImage.uri}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              ) : (
                <PersionIcon width={'100%'} height={'100%'} />
              )}
            </View>
            <View style={styles.iconContainer}>
              <Text style={{color: '#C2C7FF', fontWeight: '500', fontSize: 14}}>
                Upload Your Photo
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              value={name.value}
              onChangeText={text => setName({value: text, error: ''})}
              placeholder="Enter Your Name"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={handleEmailSubmitEditing}
              returnKeyType="next"
            />
            <View style={styles.iconContainer}>
              <PasswordIcon width={22} height={22} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={city.value}
              onChangeText={text => setCity({value: text, error: ''})}
              placeholder="Enter Your City"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={handleEmailSubmitEditing}
              returnKeyType="next"
            />
            <View style={styles.iconContainer}>
              <ConfirmIcon width={22} height={22} />
            </View>
          </View>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButtons,
                selectedGender === 'Male' && styles.genderButtonSelected,
              ]}
              onPress={() => setSelectedGender('Male')}>
              <MaleIcon />
              <Text
                style={[
                  styles.genderText,
                  selectedGender === 'Male' && styles.genderTextSelected,
                ]}>
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButtons,
                selectedGender === 'Female' && styles.genderButtonSelected,
              ]}
              onPress={() => setSelectedGender('Female')}>
              <FemaleIcon />
              <Text
                style={[
                  styles.genderText,
                  selectedGender === 'Female' && styles.genderTextSelected,
                ]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleProfileCreate}>
            <Text style={styles.loginButtonText}>Finalize It!!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  illustration: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#6D5CFF',
    marginBottom: 30,
    marginTop: 10,
  },
  genderButtons: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  genderButtonSelected: {
    backgroundColor: '#6D5CFF',
    borderColor: '#E2DEFF',
    borderWidth: 1,
    borderRadius: 10,
  },

  genderText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#B1A8FF',
  },
  genderTextSelected: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
  },
  errorCpontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2DEFF',
    borderRadius: 14,
    height: 56,
    backgroundColor: '#FFFFFF',
  },
  photoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2DEFF',
    borderRadius: 14,
    height: 76,
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
  genderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2DEFF',
    borderRadius: 14,
    height: 56,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 20,
    color: '#333333',
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 15,
  },
  
  inputIcon: {
    width: 22,
    height: 22,
    tintColor: '#6C5CE7',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '400',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  noAccountContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  noAccountText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '6500',
  },
  signUpText: {
    color: '#6D5CFF',
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#888888',
    fontSize: 14,
  },
  instagramButton: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  instagramButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreateProfile;
