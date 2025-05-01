import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ArrowIcon from '../assets/svgs/ArrowIcon.svg';
import NotificationIcon from '../assets/svgs/notification.svg';
import HameBurgerIcon from '../assets/svgs/HamBurger.svg';
import Logo from '../assets/svgs/LogoSvg.svg';
import SearchIcon from '../assets/svgs/search.svg';

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    setQuery(input);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          backgroundColor: '#6A66FF',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 25,
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/PersonImage.png')}
                style={styles.image1}
                resizeMode="cover"
              />
            </View>

            <View style={{justifyContent: 'center'}}>
              <Text style={{fontWeight: '600', fontSize: 16, color: '#FFFFFF'}}>
                Hello Alex
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text
                  style={{fontWeight: '500', fontSize: 14, color: '#EEEEEE'}}>
                  Ahmedabad
                </Text>
                <ArrowIcon />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <View style={styles.iconContainer}>
              <NotificationIcon />
            </View>
            <View style={styles.iconContainer}>
              <HameBurgerIcon />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <Logo width={'10%'} height={50} />
          <TextInput
            style={{
              backgroundColor: '#9ca2ff',
              width: '70%',
              height: 50,
              borderRadius: 10,
              paddingLeft: 10,
              // paddingVertical:10,
              color: '#fff',
              fontSize: 16,
            }}
            placeholderTextColor="#fff"
            placeholder="Search Anything..."
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity
            onPress={handleSearch}
            style={{
              height: 50,
              backgroundColor: '#9ca2ff',
              borderRadius: 10,
              padding: 10,
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{paddingHorizontal: 16}}>
        <Text
          style={{
            fontFamily: 'BricolageGrotesque_24pt-Regular',
            fontSize: 20,
            fontWeight: '600',
            paddingVertical: 20,
            color: "#2A2A2A"
          }}>
          Featured Events
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 150,
              height: 150,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View> 
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 150,
              height: 150,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View> 
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 150,
              height: 150,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View> 
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: 150,
              height: 150,
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>  
          </ScrollView>
        <Text
          style={{
            fontFamily: 'BricolageGrotesque_24pt-Regular',
            fontSize: 20,
            fontWeight: '600',
            paddingVertical: 20,
            color: "#2A2A2A"
          }}>
          Upcoming Events 
            </Text>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: "100%",
              height: 350,
              borderRadius: 20,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: "100%",
              height: 350,
              borderRadius: 20,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: "100%",
              height: 350,
              borderRadius: 20,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          <View
            style={{
              backgroundColor: '#9ca2ff',
              width: "100%",
              height: 350,
              borderRadius: 20,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Event 1</Text>
          </View>
          
          </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image1: {
    height: '100%',
    width: '100%',
  },
  profileContainer: {
    aspectRatio: 1,
    width: 40,
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconContainer: {
    backgroundColor: '#9ca2ff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
});
