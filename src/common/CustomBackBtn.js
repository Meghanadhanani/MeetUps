// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import BackBtnIcon from '../assets/svgs/BackBtn.svg';
// import ShareBtnIcon from '../assets/svgs/ShareBtn.svg';
// import {useNavigation} from '@react-navigation/native';

// const CustomBackBtn = ({iconName = [], title}) => {
//   const navigation = useNavigation();
//   return (
//     <View
//       style={{
//         backgroundColor: '#FFFFFF',
//         height: 55,
//         width: '100%',
//         paddingHorizontal: 16,
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{
//           width: "33.3%",

//           height: '100%',
//           alignItems: 'flex-start',
//           justifyContent: 'center',
//         }}>
//         <BackBtnIcon />
//       </TouchableOpacity>
//       <Text
//         style={{
//           width: "33.3%",
//           fontFamily:"BricolageGrotesque_24pt-Regular",
//           fontSize:16,
//           fontWeight:600,
//           textAlign: 'center',
//         }}>
//         {title}
//       </Text>
//       <TouchableOpacity
//         style={{
//                     width: "33.3%",
//           height: '100%',
//           alignItems: 'flex-end',
//           justifyContent: 'center',
         
//         }}>
//         {
//           // Array.isArray(iconName) &&
//           iconName.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={item.onPress}
//               //   style={{marginLeft: index !== 0 ? 10 : 0}}
//             >
//               {item.icon}
//             </TouchableOpacity>
//           ))
//         }
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CustomBackBtn;

// const styles = StyleSheet.create({});

// //   <CustomBackBtn
// //         navigation={() => console.log('reeeeeeee')}
// //         iconName={[
// //           {icon: <ShareBtn />, onPress: () => console.log('Share')},
// //           {icon: <NotificationIcon />, onPress: () => console.log('Settings')},
// //         ]}
// //       />

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackBtnIcon from '../assets/svgs/BackBtn.svg';
import ShareBtnIcon from '../assets/svgs/ShareBtn.svg';
import { useNavigation } from '@react-navigation/native';

const CustomBackBtn = ({iconName = [], title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#FAFAFA',
        height: 60,
        width: '100%',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:"center"
      }}>
      <TouchableOpacity
       
              onPress={() => navigation.goBack()}
        style={{
          width: 45,
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <BackBtnIcon />
      </TouchableOpacity>
       <Text
        style={{
          width: "33.3%",
          fontFamily:"BricolageGrotesque_24pt-Regular",
          fontSize:16,
          fontWeight:600,
          textAlign: 'center',
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        {
          // Array.isArray(iconName) &&
          iconName.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              //   style={{marginLeft: index !== 0 ? 10 : 0}}
            >
              {item.icon}
            </TouchableOpacity>
          ))
        }
      </TouchableOpacity>
    </View>
  );
};

export default CustomBackBtn;

const styles = StyleSheet.create({});


//   <CustomBackBtn
//         navigation={() => console.log('reeeeeeee')}
//         iconName={[
//           {icon: <ShareBtn />, onPress: () => console.log('Share')},
//           {icon: <NotificationIcon />, onPress: () => console.log('Settings')},
//         ]}
//       />