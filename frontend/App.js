import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Register: RegisterScreen,
  Login: LoginScreen
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
      headerLeft: null,
    }
  });

  export default createAppContainer(navigator);