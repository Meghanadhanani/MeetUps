import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrowIcon from '../assests/svgs/ArrowIcon.svg';
import NotificationIcon from '../assests/svgs/notification.svg';
import HameBurgerIcon from '../assests/svgs/HamBurger.svg';
const HomeScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flex: 0.2,
          backgroundColor: '#6A66FF',
          width: '100%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 16,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            // Removed the background color 'red' for clarity
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              // Removed the background color 'blue' for clarity
            }}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assests/PersonImage.png')}
                style={styles.image1}
                resizeMode="cover" // Changed to cover for better profile image display
              />
            </View>

            <View style={{justifyContent: 'center'}}>
              <Text style={{fontWeight: '600', fontSize: 16, color: '#FFFFFF'}}>
                Hello ALexa
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text
                  style={{fontWeight: '500', fontSize: 14, color: '#EEEEEE'}}>
                  Ahmedabad
                </Text>
                <ArrowIcon />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <View style={styles.iconContainer}>
              <NotificationIcon />
            </View>
            <View style={styles.iconContainer}>
              <HameBurgerIcon />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image1: {
    height: '100%',
    width: '100%',
  },
  profileContainer: {
    aspectRatio: 1, // This ensures the container stays square
    width: 40, // Base width that can be changed
    borderRadius: 50,
    overflow: 'hidden', // This ensures the image doesn't spill outside the border radius
    // Removed the green background color
  },
  iconContainer: {
    backgroundColor: '#9ca2ff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1, // This ensures icons stay square
  },
});
