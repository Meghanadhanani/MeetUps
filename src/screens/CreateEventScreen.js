import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBackBtn from '../common/CustomBackBtn'
import ShareBtn from "../assets/svgs/ShareBtn.svg"
const CreateEventScreen = () => {
  return (
 <View style={styles.container}>
   <CustomBackBtn
        navigation={() => console.log('reeeeeeee')}
        iconName={[
          {icon: <ShareBtn />, onPress: () => console.log('Share')},
          
        ]}
      />
</View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#FFFFFF',
  },
});
