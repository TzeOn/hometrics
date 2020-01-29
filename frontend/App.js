import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import LandingScreen from './src/screens/LandingScreen';
import EnergyScreen from './src/screens/EnergyScreen';
import SimulationScreen from './src/screens/SimulationScreen';
import SimulationScreen2 from './src/screens/SimulationScreen2';
import React from 'react';
import { Image } from 'react-native';

const navigator = createStackNavigator({
    Home: HomeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
    Confirmation: ConfirmationScreen,
    Landing: LandingScreen,
    Energy: EnergyScreen,
    Simulation: SimulationScreen,
    Simulation2: SimulationScreen2,
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