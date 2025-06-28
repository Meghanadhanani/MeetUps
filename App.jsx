import './global.css';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/Appnavigator';
import {TabVisibilityProvider} from './src/common/TabVisibilityContext';

const App = () => {
  return(
  <TabVisibilityProvider>
    <AppNavigator />
  </TabVisibilityProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
