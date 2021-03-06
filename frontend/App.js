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
import SettingsScreen from "./src/screens/SettingsScreen";
import ManageUsersScreen from "./src/screens/ManageUsersScreen"; 
import styles from './styles';
import React from 'react';
import { Image, Dimensions } from 'react-native';
import PendingScreen from "./src/screens/PendingScreen"; 
import UserInfo from "./src/screens/UserInfo"; 

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
    Humidity: HumidityScreen, 
    ManageUsers: ManageUsersScreen, 
    Pending: PendingScreen, 
    UserInfo: UserInfo,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Hometrics',
      headerStyle: {
      backgroundColor: '#41B3A3',
      height: headerHeight,
      },
      headerTitleStyle: {
        color: '#ffffff',
        textAlign: 'center',
        flex:1,
        fontSize: 35,
        alignSelf: 'center',  
      },
      headerTintColor: '#ffffff',
      headerRight: (      
        <Image style={{width: headerHeight * 0.5, height: headerHeight * 0.5 }} source={require('./assets/splash.png')}/>     
      ),
    }
  });

  export default createAppContainer(navigator);