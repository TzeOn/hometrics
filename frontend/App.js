import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import LandingScreen from './src/screens/LandingScreen';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


const navigator = createStackNavigator({
  Home: HomeScreen,
  Register: RegisterScreen,
  Login: LoginScreen,
  Confirmation: ConfirmationScreen,
  Landing: LandingScreen,
  
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Hometrics',
      headerStyle: {
      backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: '#FF9800',
        textAlign: 'center',
        flex:1,
        fontSize: 30,
        alignSelf: 'center'
      },
      headerTintColor: '#FF9800',
      
      headerRight: (      
        <Image style={{width: 30, height: 30}} source={require('./assets/splash.png')}/>     
      ),
      
    }
  });

  export default createAppContainer(navigator);