import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  ProjectId: '',
  TaskId: '',
  MeetingId: '',
  projects: [{
    'ProjectName': 'Default',
    'date':'-',
    'id': 'aaaaa',
    'status': 'join',
  }],
  tasks: [],
  meetings: [],
  projectStateName: '',
  projectStateDetail: '',
  meetingStateName: '',
  meetingStateDetail: '',
  meetingStateStartDate: '',
  meetingStateStartHour: '',
  meetingStateStartMinutes: '',
  meetingStateEndDate: '',
  meetingStateEndHour: '',
  meetingStateEndMinutes: '',
  meetingStateLocation: '',
  taskStateName: '',
  taskStateDetail: '',
  newfeeds: [],
  checklistTaskArray: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_PROJECT':
    return { 
      ...state,
      projects: [...state.projects.slice(0, action.index),...state.projects.slice(action.index + 1)]      
    }
    case 'DELETE_TASK':
      return { 
        ...state,
        tasks: [...state.tasks.slice(0, action.index),...state.tasks.slice(action.index + 1)]      
      }
    case 'ADD_CHECKLIST_STATE':
      const tasks = state.tasks.map(task => {
        if (task.id === action.taskId) {
          let checklist = {name: action.name, id: action.id, checked: action.checked}
          task.checklists = [...task.checklists, checklist]
        };
        return task;
      });
      return ({ ...state, tasks });
    case 'ADD_ID_TASK_STATE':
      return Object.assign({}, state, {
        TaskId : action.id
      })
    case 'ADD_PROJECT_STATE':
      return Object.assign({}, state, {
        projectStateName : action.name, projectStateDetail : action.detail
      })
    case 'ADD_TASK_STATE':
      return Object.assign({}, state, {
        taskStateName : action.name, taskStateDetail : action.detail
      })
    case 'ADD_MEETING_STATE':
      return Object.assign({}, state, {
        meetingStateName : action.name, meetingStateDetail : action.detail
      })
    case 'ADD_MEETING_START_STATE':
      return Object.assign({}, state, {
        meetingStateStartDate : action.date,
        meetingStateStartHour : action.hour,
        meetingStateStartMinutes : action.minutes
      })
    case 'ADD_MEETING_END_STATE':
      return Object.assign({}, state, {
        meetingStateEndDate : action.date,
        meetingStateEndHour : action.hour,
        meetingStateEndMinutes : action.minutes
      })
    case 'ADD_MEETING_LOCATION_STATE':
      return Object.assign({}, state, {
        meetingStateLocation : action.location
      })
    case 'ADD_MEETING':
      return { 
        ...state,
        meetings: state.meetings.concat(action.meeting)
      }
    case 'ADD_PROJECT':
      return { 
        ...state,
        projects: state.projects.concat(action.project),
        newfeeds: state.newfeeds.concat(action.newfeed)
      }
    case 'ADD_TASK':
      return { 
        ...state,
        tasks: state.tasks.concat(action.task),
        newfeeds: state.newfeeds.concat(action.newfeed)
      }
    case 'DETAIL_PROJECT':
      return Object.assign({}, state, {
        ProjectId: action.id
      })
    default:
      return state
  }
}

const store = createStore(reducer)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo-dev.png'),
        require('./assets/images/logo-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
