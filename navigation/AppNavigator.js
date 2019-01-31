import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogInScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Main: MainTabNavigator });
const AuthStack = createStackNavigator({ LogIn: LogInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
));