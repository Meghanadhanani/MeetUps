import './global.css';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/Appnavigator';
import {TabVisibilityProvider} from './src/common/TabVisibilityContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabVisibilityProvider>
        <AppNavigator />
      </TabVisibilityProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});

