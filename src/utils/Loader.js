import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
// import strings from '../core/strings';

const Loader = (props) => {
  const { loadings, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loadings}
      onRequestClose={() => {
      }}>
      <View style={styles.modalBackground}>
        {/* <View style={styles.activityIndicatorWrapper}> */}
          <ActivityIndicator
            animating={true}
            color="#6D5CFF"
            size="large"
            style={styles.activityIndicator}
          />
          {/* <Text style={{ color: "#121212", marginBottom: 16, fontWeight: 'bold' }}>Please wait...</Text> */}
        {/* </View> */}
      </View>
    </Modal>
  )
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: "#7E66EA",
    height: 80,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  }
});