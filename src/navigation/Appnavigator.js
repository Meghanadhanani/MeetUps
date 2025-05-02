  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import Toast from 'react-native-toast-message';
  import CreateProfile from '../auth/CreateProfile';
  import LoginScreen from '../auth/LoginScreen';
  import OTPScreen from '../auth/OTPScreen';
  import SecureAccountScreen from '../auth/SecureAccountScreen';
  import SignupScreen from '../auth/SignupScreen';
  import HomeScreen from '../screens/HomeScreen';
  import OnboardingScreen1 from '../screens/OnboardingScreen1';
  import OnboardingScreen2 from '../screens/OnboardingScreen2';
  import OnboardingScreen3 from '../screens/OnboardingScreen3';
  import SplashScreen from '../screens/SplashScreen';
  import BottomTabs from './BottomTabs';
  const Stack = createNativeStackNavigator();

  export default function AppNavigator() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="BottomTabs"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
              name="OnboardingScreen1"
              component={OnboardingScreen1}
            />
            <Stack.Screen
              name="OnboardingScreen2"
              component={OnboardingScreen2}
            />
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
            />
            <Stack.Screen
              name="OnboardingScreen3"
              component={OnboardingScreen3}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen
              name="SecureAccountScreen"
              component={SecureAccountScreen}
            />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />

            {/* Add more screens here */}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </>
    );
  }
