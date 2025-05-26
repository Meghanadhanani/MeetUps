import AsyncStorage from '@react-native-async-storage/async-storage';
export const isDebug = true;

export const StorageUtils = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in AsyncStorage', error);
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from AsyncStorage', error);
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage', error);
    }
  },
};
export const getCurrentUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');

    if (value != null) {
      const a = JSON.parse(value);
      return a.id;
    } else {
      return null;
    }
  } catch (e) {}
};
