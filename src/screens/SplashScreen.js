import {Animated, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {StorageUtils} from '../utils/StorageUtils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await StorageUtils.getItem('userData');
        console.log("userdataaaaaaa",userData);
        
        if (userData) {
          setTimeout(() => {
            navigation.replace('BottomTabs');
          },800);
        } else {
          setTimeout(() => {
            navigation.replace('SignupScreen');
          }, 10000);
        }
      } catch (error) {
        console.error('Error reading user data', e);
        navigation.replace('SignupScreen');
      }
    };
    checkUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d5cff',
  },
  logo: {
    height: 200,
    width: 200,
  },
});
