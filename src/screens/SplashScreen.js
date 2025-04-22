import { Animated, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignupScreen')
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assest/logo.png')}
        style={styles.logo}
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
