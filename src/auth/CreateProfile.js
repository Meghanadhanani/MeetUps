import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {InstagramLogin} from 'react-native-social-login'; // You'll need to install an appropriate package
import ConfirmIcon from '../assets/svgs/Password.svg';
import PasswordIcon from '../assets/svgs/Frame1.svg';
import InstaIcon from '../assets/svgs/SocialIcons.svg';
import GoogleIcon from '../assets/svgs/GoogleIcon.svg';
import {API, LOGIN_API, SIGNWITHGOOGLE_API} from '../utils/ApiHelper';
import axios from 'axios';
import {showToastMSGError, showToastMSGNormal} from '../utils/ToastMessages';
import {passwordValidater} from '../utils/validations/passwordValidater';
import {emailValidater} from '../utils/validations/emailValidater';
import {StorageUtils} from '../utils/StorageUtils';
import FemaleIcon from '../assets/svgs/FemaleIcon.svg';
import MaleIcon from '../assets/svgs/MaleIcon.svg';
import PersionIcon from "../assets/svgs/Person.svg"
const CreateProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const googleAuthData = useRef(null);
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male');

  const passwordInputRef = useRef(null);

  const handleEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };

  const checkValidation = () => {
    const isEmailValid = emailValidater(email.value);

    // Reset errors
    setEmailError(false);

    // Validate email
    if (!isEmailValid) {
      const errorMessage = 'Please enter a valid email address';
      setEmailError(true);
      setEmail({...email, error: errorMessage});
      showToastMSGError(errorMessage); // Use the message directly
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    console.log('rrreddddddddddddddd');
    if (checkValidation() === false) {
      return;
    }
    try {
      const data = {
        email: email.value,
        password: password.value,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      console.log('Login Data:', data); // Log the data being sent
      console.log('Login API URL:', LOGIN_API); // Log the API URL

      const response = await axios.post(LOGIN_API, data, config);
      if (response.status === 200) {
        // showToastMSGNormal('Login Successful');
        await StorageUtils.setItem('userData', response.data);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        }, 100);
      }
      console.log('Response:', response); // Log the response data
    } catch (error) {
      showToastMSGError(error.response.data.error);
      console.log('Login Error:', error.response.data.error); // Log the error response
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* 3D Illustration - Replace with your actual image */}
          <Image
            source={require('../assets/DRIP_6.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Let’s Set Up Your Profile</Text>
          <View style={styles.photoContainer}>
           <View style={{width:"30%", backgroundColor:"#E2DEFF", height: "100%",borderRadius:10}}>
           <PersionIcon width={"100%"} height={"100%"} />
           </View>
            <View style={styles.iconContainer}>
             <Text style={{color:"#C2C7FF", fontWeight:"500", fontSize:14}}>Upload Your Photo</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
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
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
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
            onPress={() => {
              navigation.navigate('OnboardingScreen1');
            }}>
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
    // backgroundColor: '#6D5CFF',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    gap:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  genderButtonSelected: {
    backgroundColor: '#6D5CFF',
    borderColor: '#E2DEFF',
    borderWidth: 1,
    borderRadius: 10, // selected background color
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
    // marginTop: 5,
    // marginLeft: 10,
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
  photoContainer:{ 
     width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2DEFF',
    borderRadius: 14,
    height: 76,
    backgroundColor: '#FFFFFF',
  padding:5
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
    // gap:2
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
