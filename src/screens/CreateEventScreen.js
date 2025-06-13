import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateEventScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // remove saved user data
      navigation.replace('LoginScreen'); // navigate to login screen
    } catch (e) {
      console.error('Logout failed', e);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CreateEventScreen</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#6D5CFF',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
