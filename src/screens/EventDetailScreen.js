import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomBackBtn from '../common/CustomBackBtn';
import ShareBtn from '../assets/svgs/ShareBtn.svg';
const EventDetailScreen = ({route}) => {
  const {event} = route.params;

  console.log('eventtttttttttttttttt', event);

  return (
    <View style={styles.container}>
      <CustomBackBtn
        iconName={[{icon: <ShareBtn />, onPress: () => console.log('Share')}]}
        title={event.event_name}
      />
      <View>
        <View style={{}}></View>
      </View>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#FFFFFF',
  },
});
