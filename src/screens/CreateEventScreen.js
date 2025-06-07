import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreateEventScreen = () => {
  return (
 <View style={styles.container}>
  <Text>CreateEventScreen</Text>
  <Image 
    source={{ uri: 'https://picsum.photos/200' }} 
    style={{ width: 200, height: 200, backgroundColor: 'gray' }} 
    resizeMode="cover" 
  />
</View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
