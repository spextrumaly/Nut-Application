import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/TaskScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProjectScreen from '../screens/ProjectScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import JoinProjectScreen from '../screens/JoinProjectScreen';
import LoginScreen from '../screens/LogInScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Project: ProjectScreen,
  CreateProject: CreateProjectScreen,
  CreateTask: CreateTaskScreen,
  JoinProject: JoinProjectScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Project: ProjectScreen,
  CreateTask: CreateTaskScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Task',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Login: LoginScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
