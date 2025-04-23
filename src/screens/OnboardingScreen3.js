import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OnboardingScreen3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../assests/DRIP_15.png')}
          style={styles.image1}
          resizeMode="contain"
        />
      </View>
      <View style={styles.meetContainer}>
        <Text style={{fontSize: 30, fontWeight: '500', color: 'white'}}>
          Share Your Personal Experiences
        </Text>
        <Text style={{fontSize: 20, color: 'white', fontWeight: '300'}}>
          Share your experiences with people and get connected with each other
        </Text>
       
      </View>
      <View
          style={{
            width: '100%',
            gap: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingBottom: 10,
            // position: 'absolute',
            //  bottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              justifyContent: 'space-between',
            }}>
            <View style={[styles.lines, {backgroundColor: '#FFFFFF'}]} />
            <View style={[styles.lines, {backgroundColor: '#FFFFFF'}]} />
            <View style={[styles.lines, {backgroundColor: '#FFFFFF'}]} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <Text style={{color: '#6D5CFF', fontSize: 20, fontWeight: '500'}}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default OnboardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d5cff',
  },
  imagecontainer: {
    flex: 2 / 3,
    width: '100%',
    paddingHorizontal: 20,
  },
  image1: {
    height: '100%',
    width: '100%',
  },
  meetContainer: {
    flex: 1 / 3,
    width: '100%',
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  lines: {
    width: '30%',
    height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
});
