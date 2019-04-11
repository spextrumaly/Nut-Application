import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MeetingsScreen from '../screens/MeetingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProjectScreen from '../screens/ProjectScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import JoinProjectScreen from '../screens/JoinProjectScreen';
import CalendarScreen from '../screens/CreateCalendarProjectScreen';
import HomeProjectScreen from '../screens/HomeProjectScreen';
import HomeTaskScreen from '../screens/HomeTaskScreen';
import CalendarTaskScreen from '../screens/CreateCalendarTaskScreen';
import CreateMeetingScreen from '../screens/meeting/CreateMeetingScreen'
import CalendarMeetingScreen from '../screens/meeting/CreateCalendarMeeting'
import CalendarMeetingEndScreen from '../screens/meeting/CreateCalendarEndMeeting'
import LocationMeetingScreen from '../screens/meeting/CreateLocationMeeting'
import MeetingScreen from '../screens/meeting/HomeMeetingScreen';
import JoinMeetingScreen from '../screens/meeting/JoinMeetingScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  HomeProject: HomeProjectScreen,
  Project: ProjectScreen,
  CreateProject: CreateProjectScreen,
  CreateTask: CreateTaskScreen,
  JoinProject: JoinProjectScreen,
  Calendar: CalendarScreen,
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { 
    activeTintColor: '#4A3C39',
    inactiveTintColor: '#ccc',
  },
  header: null,
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

const ProjectStack = createStackNavigator({
  HomeProject: HomeProjectScreen,
  Project: ProjectScreen,
  CreateProject: CreateProjectScreen,
  CreateTask: CreateTaskScreen,
  JoinProject: JoinProjectScreen,
  Calendar: CalendarScreen,
  CalendarTask: CalendarTaskScreen,
  HomeTask: HomeTaskScreen,
});

ProjectStack.navigationOptions = {
  tabBarLabel: 'Project',
  tabBarOptions: { 
    activeTintColor: '#4A3C39',
    inactiveTintColor: '#ccc',
  },
  header: null,
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

const MeetingsStack = createStackNavigator({
  Meetings: MeetingsScreen,
  Meeting: MeetingScreen,
  CreateMeeting: CreateMeetingScreen,
  CalendarMeeting: CalendarMeetingScreen,
  CalendarMeetingEnd: CalendarMeetingEndScreen,
  LocationMeeting: LocationMeetingScreen,
  JoinMeeting: JoinMeetingScreen,
});

MeetingsStack.navigationOptions = {
  tabBarLabel: 'Meeting',
  tabBarOptions: { 
    activeTintColor: '#4A3C39',
    inactiveTintColor: '#ccc',
  },
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: { 
    activeTintColor: '#4A3C39',
    inactiveTintColor: '#ccc',
  },
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ProjectStack,
  MeetingsStack,
  SettingsStack,
});
