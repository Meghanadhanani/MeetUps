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
import EmailIcon from '../assests/svgs/Email.svg';
import FrameIcon from '../assests/svgs/Frame1.svg';
import InstaIcon from '../assests/svgs/SocialIcons.svg';
import GoogleIcon from '../assests/svgs/GoogleIcon.svg';
import {API, LOGIN_API, SIGNWITHGOOGLE_API} from '../utils/ApiHelper';
import axios from 'axios';
import {showToastMSGError, showToastMSGNormal} from '../utils/ToastMessages';
import {passwordValidater} from '../utils/validations/passwordValidater';
import {emailValidater} from '../utils/validations/emailValidater';
import { StorageUtils } from '../utils/StorageUtils';
const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const googleAuthData = useRef(null);
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    const isPasswordValid = passwordValidater(password.value);

    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    setEmailError(false);
    if (!email.value.trim()) {
      const errorMessage = 'Email is required';
      setEmailError(true);
      setEmail({...email, error: errorMessage});
      showToastMSGError(errorMessage);
      return false;
    } 
    // Validate email
    if (!isEmailValid) {
      const errorMessage = 'Please enter a valid email address';
      setEmailError(true);
      setEmail({...email, error: errorMessage});
      showToastMSGError(errorMessage); // Use the message directly
      return false;
    }
    setEmailError(false);
    if (!password.value.trim()) {
      const errorMessage = 'Password is required';
      setEmailError(true);
      setEmail({...email, error: errorMessage});
      showToastMSGError(errorMessage);
      return false;
    } 
    // Validate password
    if (!isPasswordValid) {
      const errorMessagePass = 'Password must be at least 2 characters with numbers and letters';
      setPasswordError(true);
      setPassword({
        ...password,
        error: errorMessagePass
      });
      showToastMSGError(errorMessagePass)
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
            routes: [{name: "HomeScreen"}],
          });
        }, 100);
      }
      console.log('Response:', response); // Log the response data
    } catch (error) {
      showToastMSGError(error.response.data.error);
      console.log('Login Error:', error.response.data.error); // Log the error response
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
        // Handle error for Google Play Services not available
      } else {
        // Handle general Google Sign-In errors
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
        // showToastMSGNormal('Login Successful');
        await StorageUtils.setItem('userData', response.data);
        setTimeout(() => {
          
          navigation.reset({
            index: 0,
            routes: [{name: "HomeScreen"}],
          });
        }, 100);}
      console.log('Response:', response.data);
      // Handle successful login (store user data, navigate, etc.)
    } catch (error) {
      console.error('SSO Login Error:', error.response?.data || error.message);
      // Show appropriate error message to user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* 3D Illustration - Replace with your actual image */}
          <Image
            source={require('../assests/DRIP_16.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Let's Get You Logged in</Text>

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
          <View style={styles.errorCpontainer}>
         
</View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={passwordInputRef}
              returnKeyType="done"
              secureTextEntry={!showPassword}
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              placeholder="Enter Your Password"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowPassword(!showPassword)}>
              <FrameIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
         
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.signUpText}>Sign Up</Text>
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
    color: "#FF0000",
    fontSize: 12,
    // marginTop: 5,
    // marginLeft: 10,
  },
  errorCpontainer:{
    width: '100%',
    flexDirection: 'row',
justifyContent:'flex-start'
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

export default LoginScreen;
