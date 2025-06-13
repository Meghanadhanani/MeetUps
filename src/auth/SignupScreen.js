import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
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
import EmailIcon from '../assets/svgs/Email.svg';
import GoogleIcon from '../assets/svgs/GoogleIcon.svg';
import InstaIcon from '../assets/svgs/SocialIcons.svg';
import {SIGNUP_API, SIGNWITHGOOGLE_API} from '../utils/ApiHelper';
import Loader from '../utils/Loader';
import {isDebug, StorageUtils} from '../utils/StorageUtils';
import {showToastMSGError, showToastMSGNormal} from '../utils/ToastMessages';
import {emailValidater} from '../utils/validations/emailValidater';
const SignupScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const googleAuthData = useRef(null);
  const [email, setEmail] = useState({value: '', error: ''});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '406517724442-375f1rt9dlfcd7f9039mkce928nie6n1.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, []);

  const passwordInputRef = useRef(null);

  const handleEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };

  const checkValidation = () => {
    const isEmailValid = emailValidater(email.value);

    if (!email.value.trim()) {
      const errorMessage = 'Email is required';
      showToastMSGError(errorMessage);
      return false;
    }
    if (!isEmailValid) {
      const errorMessage = 'Please enter a valid email address';
      showToastMSGError(errorMessage);
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (checkValidation() === false) {
      return;
    }
    setLoading(true);
    try {
      const data = {
        email: email.value,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      const response = await axios.post(SIGNUP_API, data, config);
      setLoading(false);

      if (response.data.success) {
        const {is_verified} = response.data.status;

        if (is_verified) {
          showToastMSGError(response.data.message);
        } else {
          showToastMSGNormal(response.data.message);
          setTimeout(() => {
            navigation.navigate('OTPScreen', {email});
          }, 2000);
        }
      } else {
        showToastMSGError(response.data.message);
      }
      isDebug && console.log('Response:', response);
    } catch (error) {
      setLoading(false);
      showToastMSGError(error.response?.data?.message);
      isDebug && console.log('Sign up Error:', error);
    }
  };

  const onGLoginPressed = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Response:', userInfo);
      const {idToken, user} = userInfo.data;

      if (!idToken) {
        console.log('No ID Token received.');
        return;
      } else {
        console.log('ID Token received:', idToken);
      }

      googleAuthData.current = {idToken, user};

      await performSSOLogin();
    } catch (error) {
      console.log('Google Sign-In Error:', error);

      if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        showToastMSGError('Google Services not available');
      } else {
        showToastMSGError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const performSSOLogin = async () => {
    console.log('Performing SSO login');

    if (!googleAuthData.current?.idToken) {
      console.log('No ID token available');
      return;
    }

    const {idToken} = googleAuthData.current;

    try {
      const response = await axios.post(
        SIGNWITHGOOGLE_API,
        {idToken},
        {headers: {'Content-Type': 'application/json'}},
      );
      if (response.status === 200) {
        await StorageUtils.setItem('userData', response.data);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabs'}],
          });
        }, 100);
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.error('SSO Login Error:', error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require('../assets/DRIP_5.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Get Started With SociaList</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
              placeholder="Enter Your Email"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={handleEmailSubmitEditing}
              returnKeyType="next"
            />
            <View style={styles.iconContainer}>
              <EmailIcon width={22} height={22} />
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Send Code</Text>
          </TouchableOpacity>

          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.signUpText}> Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.instagramButton} onPress={() => {}}>
            <InstaIcon width={24} height={24} style={styles.socialIcon} />
            <Text style={styles.instagramButtonText}>
              Sign in with Instagram
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.instagramButton}
            onPress={onGLoginPressed}>
            <GoogleIcon width={24} height={24} style={styles.socialIcon} />
            <Text style={styles.instagramButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
        {loading && <Loader />}
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

export default SignupScreen;
