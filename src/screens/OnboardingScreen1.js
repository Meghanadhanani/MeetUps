import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OnboardingScreen1 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../assets/DRIP_19.png')}
          style={styles.image1}
          resizeMode="contain"
        />
      </View>
      <View style={styles.meetContainer}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '600',
            color: 'white',
            fontFamily: 'SpaceGrotesk-Regular',
          }}>
          Meet Your Favorite Influencers
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: '300',
            fontFamily: 'BricolageGrotesque_24pt-Regular',
          }}>
          Explore and meet your favorite influencer by signing up here
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          gap: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 10,
          paddingHorizontal: 16,
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
          <View style={[styles.lines, {backgroundColor: '#998DFF'}]} />
          <View style={[styles.lines, {backgroundColor: '#998DFF'}]} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('OnboardingScreen2');
          }}>
          <Text style={{color: '#6D5CFF', fontSize: 20, fontWeight: '500'}}>
            Contiune
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen1;

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
