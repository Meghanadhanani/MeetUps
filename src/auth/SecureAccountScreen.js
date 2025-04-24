import axios from 'axios';
import React, { useRef, useState } from 'react';
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
import PasswordIcon from '../assests/svgs/Frame1.svg';
import ConfirmIcon from '../assests/svgs/Password.svg';
import { LOGIN_API, SECURE_PASSWORD_API } from '../utils/ApiHelper';
import { StorageUtils } from '../utils/StorageUtils';
import { showToastMSGError, showToastMSGNormal } from '../utils/ToastMessages';
import { emailValidater } from '../utils/validations/emailValidater';
import { passwordValidater } from '../utils/validations/passwordValidater';
const SecureAccountScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const googleAuthData = useRef(null);
  const [confirmPassword, setconfirmPassword] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] =useState(false)
  const confirmPasswordInputRef = useRef(null);

  const handlePasswordSubmitEditing = () => {
    confirmPasswordInputRef.current?.focus();
  };

  const checkValidation = () => {
    const isPasswordValid = passwordValidater(password.value);
     const isConfirmPasswordValid = passwordValidater(confirmPassword.value);
      if (!password.value.trim()) {
         const errorMessage = 'Password is required';
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
   if (!confirmPassword.value.trim()) {
      const errorMessage = 'Confirm Password is required';
      showToastMSGError(errorMessage);
      return false;
    } 
    // Validate password
    if (confirmPassword.value != password.value) {
      const errorMessagePass = 'Password do not match';
      showToastMSGError(errorMessagePass)
      return false;
    }
    return true;
  };

  const handleSecurePassword = async () => {
    if (checkValidation() === false) {
      return;
    }
    try {
      const data = {
        password: password.value,
        confirmPassword: confirmPassword.value,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
console.log("data",data);

      const response = await axios.post(SECURE_PASSWORD_API, data, config);
      if (response.status === 200) {
        console.log("Password resss", response.data.message);
        
        // showToastMSGNormal('Login Successful');
        await StorageUtils.setItem('userData', response.data);
        showToastMSGNormal(response.data.message)
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'CreateProfile'}],
          });
        }, 100);
      }
      console.log('Response:', response); // Log the response data
    } catch (error) {
      showToastMSGError(error.response.data.message);
      console.log('PAssword Error:', error.response.data.message); // Log the error response
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* 3D Illustration - Replace with your actual image */}
          <Image
            source={require('../assests/DRIP_6.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Secure Your Account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              placeholder="Enter Your Password"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
              // keyboardType="email-address"
              // autoCapitalize="none"
              secureTextEntry={!showPassword}
              onSubmitEditing={handlePasswordSubmitEditing}
              returnKeyType="next"
            />
           <TouchableOpacity
                         style={styles.iconContainer}
                         onPress={() => setShowPassword(!showPassword)}>
              <PasswordIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
            ref={confirmPasswordInputRef}
              value={confirmPassword.value}
              onChangeText={text => setconfirmPassword({value: text, error: ''})}
              placeholder="Confirm Your Password"
              placeholderTextColor="#C2C7FF"
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              // keyboardType="email-address"
              // autoCapitalize="none"
              returnKeyType="done"
            />
<TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <ConfirmIcon width={22} height={22} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSecurePassword}>
            <Text style={styles.loginButtonText}>Secure</Text>
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

export default SecureAccountScreen;
