import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress, accessibilityState}) => {
  const isSelected = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: isSelected ? '#6D5CFF' : 'transparent',
      }}>
      {children}
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 60,
          marginHorizontal: 25,
          borderRadius: 10,
          marginBottom: 20,
          elevation: 6,
        },
        tabBarShowIcon: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6D5CFF',
        tabBarActiveBackgroundColor: '#6A66FF',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarIconStyle: {display: 'none'},

        tabBarButton: props => <CustomTabBarButton {...props} />,
        tabBarItemStyle: {
          borderRadius: 20,
        },
      })}>
      <Tab.Screen name="Upcoming Events" component={HomeScreen} />
      <Tab.Screen name="Past Events" component={OnboardingScreen1} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
