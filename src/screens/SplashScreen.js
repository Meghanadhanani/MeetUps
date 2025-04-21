import { Animated, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start()

    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen1')
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assest/logo.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode='contain'
      />
    </View>
  )
}

export default SplashScreen

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
})
