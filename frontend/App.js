import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import LandingScreen from './src/screens/LandingScreen';
import EnergyScreen from './src/screens/EnergyScreen';
import SimulationScreen from './src/screens/SimulationScreen';
import DeviceActivityScreen from './src/screens/DeviceActivityScreen';
import DeviceManagementScreen from './src/screens/DeviceManagementScreen';
import RoomDevicesScreen from "./src/screens/RoomDevicesScreen"; 
import InternalScreen from "./src/screens/InternalScreen";
import HumidityScreen from "./src/screens/HumidityScreen";
import styles from './styles';
import React from 'react';
import { Image, Dimensions } from 'react-native';

const headerHeight = Dimensions.get('window').height * 0.08;
const navigator = createStackNavigator({
    Home: HomeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
    Confirmation: ConfirmationScreen,
    Landing: LandingScreen,
    Energy: EnergyScreen,
    DeviceActivity: DeviceActivityScreen, 
    DeviceManagement: DeviceManagementScreen,
    RoomDevices: RoomDevicesScreen,
    Simulation: SimulationScreen,
    Internal: InternalScreen,
    Humidity: HumidityScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Hometrics',
      headerStyle: {
      backgroundColor: 'black',
      height: headerHeight,
      
      },
      headerTitleStyle: {
        color: '#FF9800',
        textAlign: 'center',
        flex:1,
        fontSize: 30,
        alignSelf: 'center', 
      },
      headerTintColor: '#FF9800',
      headerRight: (      
        <Image style={{width: headerHeight * 0.5, height: headerHeight * 0.5 }} source={require('./assets/splash.png')}/>     
      ),
    }
  });

  export default createAppContainer(navigator);