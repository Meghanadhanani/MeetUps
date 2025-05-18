import './global.css';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/Appnavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const App = () => {
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
     <BottomSheetModalProvider>

  <AppNavigator />;
     </BottomSheetModalProvider>
  </GestureHandlerRootView>)
};

export default App;

const styles = StyleSheet.create({});
