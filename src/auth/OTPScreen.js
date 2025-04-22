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
import EmailIcon from '../assest/svgs/Email.svg';
import FrameIcon from '../assest/svgs/Frame1.svg';
import InstaIcon from '../assest/svgs/SocialIcons.svg';
import GoogleIcon from '../assest/svgs/GoogleIcon.svg';
import {API, LOGIN_API, SIGNWITHGOOGLE_API} from '../utils/ApiHelper';
import axios from 'axios';
import {showToastMSGError, showToastMSGNormal} from '../utils/ToastMessages';
import {passwordValidater} from '../utils/validations/passwordValidater';
import {emailValidater} from '../utils/validations/emailValidater';
import { StorageUtils } from '../utils/StorageUtils';
const OTPScreen = ({navigation}) => {
    const [otp, setOtp] = useState(['', '', '', ''])
    const [timer, setTimer] = useState(59) // 5 minutes in seconds
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const inputRefs = Array(4).fill(0).map(() => React.createRef())

    // Timer effect
    useEffect(() => {
        
        if (timer === 0) return;
    
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on unmount or timer reset
    }, [timer]); // Dependency array includes timer to reset correctly
    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp]
        newOtp[index] = value

        setOtp(newOtp)
        setError('')

        // Move to next input if value exists
        if (value && index < 3) {
            inputRefs[index + 1].current.focus()
        }
    }

    const handleKeyPress = (e, index) => {
        // Move to previous input on backspace if current input is empty
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus()
        }
    }

    const verifyOtp = async () => {
}

    const resendOtp = async () => {
    

       
    }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* 3D Illustration - Replace with your actual image */}
          <Image
            source={require('../assest/DRIP_9.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Get Started With SociaList</Text>

          <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={inputRefs[index]}
                            style={[
                                styles.otpInput,
                                error && styles.otpInputError,
                                digit && styles.otpInputFilled
                            ]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            maxLength={1}
                            keyboardType="number-pad"
                            secureTextEntry={false}
                        />
                    ))}
                </View>
 <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>Resend Code in </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.signUpText}>00:52</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate("SecureAccountScreen")}>
            <Text style={styles.loginButtonText}>Continue</Text>
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
   otpInput: {
    width: 70,
    height: 50,
    // height: 60,
    borderBottomWidth:2,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    color: '#7E66EA',
    borderColor: '#E2DEFF',
    backgroundColor: '#FFFFFF',
},
otpInputError: {
    borderColor: '#121212',
},
otpInputFilled: {
    borderColor: '#6d5cff',
    // backgroundColor: '#F8F7FE',
},
errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
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
  otpContainer: {
    flexDirection: 'row',  // Align inputs in a single line
    justifyContent: 'space-between', // Add spacing between inputs
    alignItems: 'center',
    width: '100%',
    // marginTop: 20,
},
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#6D5CFF',
    marginBottom: 20,
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

export default OTPScreen;
