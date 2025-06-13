// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import React from 'react';
// import HomeScreen from '../screens/HomeScreen';
// import OnboardingScreen1 from '../screens/OnboardingScreen1';
// import {TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';

// const Tab = createBottomTabNavigator();


// const CustomTabBarButton = ({ children, onPress }) => {
//   const route = useRoute();
//   const currentRoute = useNavigationState(state => state.routes[state.index].name);
//   const isSelected = route.name === currentRoute;

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 5,
//         borderRadius: 10,
//         backgroundColor: isSelected ? '#6D5CFF' : 'transparent',
//       }}>
//       {children}
//     </TouchableOpacity>
//   );
// };

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarStyle: {
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           elevation: 0,
//           backgroundColor: '#fff',
//           borderTopWidth: 0,
//           height: 60,
//           marginHorizontal: 25,
//           borderRadius: 10,
//           marginBottom: 20,
//           elevation: 6,
//         },
//         tabBarShowIcon: false,
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: '#6D5CFF',
//         tabBarActiveBackgroundColor: '#6A66FF',
//         tabBarLabelStyle: {
//           fontSize: 13,
//         },
//         tabBarIconStyle: {display: 'none'},

//         tabBarButton: props => <CustomTabBarButton {...props} />,
//         tabBarItemStyle: {
//           borderRadius: 20,
//         },
//       })}>
//       <Tab.Screen name="Upcoming Events" component={HomeScreen} />
//       <Tab.Screen name="Past Events" component={OnboardingScreen1} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;
// // import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// // import React from 'react';
// // import HomeScreen from '../screens/HomeScreen';
// // import OnboardingScreen1 from '../screens/OnboardingScreen1';
// // import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import { View } from 'react-native';

// // const Tab = createBottomTabNavigator();
// // const CustomTabBar = ({ state, descriptors, navigation }) => {
// //   return (
// //     <View style={styles.tabBarContainer}>
// //       {state.routes.map((route, index) => {
// //         const { options } = descriptors[route.key];
// //         const label = options.tabBarLabel !== undefined
// //           ? options.tabBarLabel
// //           : options.title !== undefined
// //           ? options.title
// //           : route.name;

// //         const isFocused = state.index === index;

// //         const onPress = () => {
// //           const event = navigation.emit({
// //             type: 'tabPress',
// //             target: route.key,
// //             canPreventDefault: true,
// //           });

// //           if (!isFocused && !event.defaultPrevented) {
// //             navigation.navigate(route.name);
// //           }
// //         };

// //         return (
// //           <TouchableOpacity
// //             key={index}
// //             onPress={onPress}
// //             style={[
// //               styles.tabButton,
// //               {
// //                 backgroundColor: isFocused ? '#6D5CFF' : 'transparent',
// //               }
// //             ]}
// //           >
// //             <Text style={[
// //               styles.tabText,
// //               {
// //                 color: isFocused ? '#fff' : '#6D5CFF',
// //               }
// //             ]}>
// //               {label}
// //             </Text>
// //           </TouchableOpacity>
// //         );
// //       })}
// //     </View>
// //   );
// // };
// // const BottomTabNavigator = () => {
// //   return (
// //     <Tab.Navigator
// //     tabBar={props => <CustomTabBar {...props} />}
// //       screenOptions={({route}) => ({
// //         headerShown: false,
// //         tabBarStyle: {
// //           position: 'absolute',
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           elevation: 0,
// //           backgroundColor: '#fff',
// //           borderTopWidth: 0,
// //           height: 60,
// //           marginHorizontal: 25,
// //           borderRadius: 10,
// //           marginBottom: 20,
// //           elevation: 6,
// //         },
// //         tabBarShowIcon: false,
// //         tabBarActiveTintColor: '#fff',
// //         tabBarInactiveTintColor: '#6D5CFF',
// //         tabBarActiveBackgroundColor: '#6A66FF',
// //         tabBarLabelStyle: {
// //           fontSize: 13,
// //         },
// //         tabBarIconStyle: {display: 'none'},

     
// //         tabBarItemStyle: {
// //           borderRadius: 20,
// //         },
// //       })}>
// //       <Tab.Screen name="Upcoming Events" component={HomeScreen} />
// //       <Tab.Screen name="Past Events" component={OnboardingScreen1} />
// //     </Tab.Navigator>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   tabBarContainer: {
// //     position: 'absolute',
// //     bottom: 20,
// //     left: 25,
// //     right: 25,
// //     height: 60,
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     flexDirection: 'row',
// //     paddingHorizontal: 10,
// //     elevation: 6,
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3,
// //     },
// //     shadowOpacity: 0.27,
// //     shadowRadius: 4.65,
// //   },
// //   tabButton: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderRadius: 10,
// //     marginHorizontal: 5,
// //   },
// //   tabText: {
// //     fontSize: 13,
// //     fontWeight: '600',
// //   },
// // });
// // export default BottomTabNavigator;


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

import {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const TAB_WIDTH = (width - 50) / 2; // 25 margin on both sides

const CustomTabBarButton = ({state, descriptors, navigation}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      {/* Sliding background */}
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{translateX}],
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          // <TouchableOpacity
          //   key={index}
          //   onPress={onPress}
          //   style={styles.tabButton}>
          //   <Text
          //     style={[styles.tabText, {color: isFocused ? '#fff' : '#6D5CFF'}]}>
          //     {label}
          //   </Text>
          // </TouchableOpacity>
                    <TouchableOpacity
                    key={index}
                    onPress={onPress}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                      borderRadius: 10,
                     
                    }}>
                      <Text style={{ color: isFocused ? '#fff' : '#6D5CFF',}}>
                    {label}
                      </Text>
                  </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    tabBar={props => <CustomTabBarButton {...props} />} 
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

        // tabBarButton: props => <CustomTabBarButton {...props} />,
        tabBarItemStyle: {
          borderRadius: 20,
        },
      })}>
      <Tab.Screen name="Upcoming Events" component={HomeScreen} />
      <Tab.Screen name="Past Events" component={OnboardingScreen1} />
    </Tab.Navigator>
  );
};
const SLIDER_MARGIN = 4; // You can tweak this value

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 0,
    elevation: 6,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    //  margin: 35, // Ensure above slider
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  slider: {
    position: 'absolute',
    height: '90%', // Shrink vertically a little
    width: TAB_WIDTH - SLIDER_MARGIN * 2, // Adjust for left and right margins
    marginHorizontal: SLIDER_MARGIN, // Ensures visible gap on both sides
    backgroundColor: '#6D5CFF',
    borderRadius: 10,
    top: '5%', // center it vertically
    left: 0,
    zIndex: 0,
  },
});

export default BottomTabNavigator;
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import React from 'react';
// import HomeScreen from '../screens/HomeScreen';
// import OnboardingScreen1 from '../screens/OnboardingScreen1';
// import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { View } from 'react-native';

// const Tab = createBottomTabNavigator();
// const CustomTabBar = ({ state, descriptors, navigation }) => {
//   return (
//     <View style={styles.tabBarContainer}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label = options.tabBarLabel !== undefined
//           ? options.tabBarLabel
//           : options.title !== undefined
//           ? options.title
//           : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={onPress}
//             style={[
//               styles.tabButton,
//               {
//                 backgroundColor: isFocused ? '#6D5CFF' : 'transparent',
//               }
//             ]}
//           >
//             <Text style={[
//               styles.tabText,
//               {
//                 color: isFocused ? '#fff' : '#6D5CFF',
//               }
//             ]}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };
// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//     tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarStyle: {
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           elevation: 0,
//           backgroundColor: '#fff',
//           borderTopWidth: 0,
//           height: 60,
//           marginHorizontal: 25,
//           borderRadius: 10,
//           marginBottom: 20,
//           elevation: 6,
//         },
//         tabBarShowIcon: false,
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: '#6D5CFF',
//         tabBarActiveBackgroundColor: '#6A66FF',
//         tabBarLabelStyle: {
//           fontSize: 13,
//         },
//         tabBarIconStyle: {display: 'none'},

//         tabBarItemStyle: {
//           borderRadius: 20,
//         },
//       })}>
//       <Tab.Screen name="Upcoming Events" component={HomeScreen} />
//       <Tab.Screen name="Past Events" component={OnboardingScreen1} />
//     </Tab.Navigator>
//   );
// };
// const styles = StyleSheet.create({
//   tabBarContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 25,
//     right: 25,
//     height: 60,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     marginHorizontal: 5,
//   },
//   tabText: {
//     fontSize: 13,
//     fontWeight: '600',
//   },
// });
// export default BottomTabNavigator;
