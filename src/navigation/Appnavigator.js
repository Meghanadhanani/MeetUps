import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../auth/LoginScreen';
import SignupScreen from '../auth/SignupScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import OnboardingScreen3 from '../screens/OnboardingScreen3';
import SplashScreen from '../screens/SplashScreen';
import Toast from 'react-native-toast-message';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <>
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false, animation:"slide_from_right"}} initialRouteName='SplashScreen'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
        <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {/* Add more screens here */} 
      </Stack.Navigator>
    </NavigationContainer>
        <Toast />
    </>
  );
}
