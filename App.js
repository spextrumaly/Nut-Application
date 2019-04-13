import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StatusBar, Text, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const initialState = {
  user: {},
  ProjectId: '',
  TaskId: '',
  MeetingId: '',
  allProjects: [{
    'ProjectName': 'Default',
    'date':'-',
    'id': 'aaaaa',
  },{'ProjectName': 'Default',
    'date':'-',
    'id': 'bbbbb',
    },],
  allMeetings: [{'meetingName': 'test',
    'meetingDetail': 'test',
    'id': 'aaaaa'}],
  projects: [],
  tasks: [],
  meetings: [],
  projectStateName: '',
  projectStateDetail: '',
  meetingStateName: '',
  meetingStateDetail: '',
  meetingStateStartDate: '',
  meetingStateStartHour: [],
  meetingStateStartMinutes: [],
  meetingStateEndHour: [],
  meetingStateEndMinutes: [],
  meetingStateLocation: '',
  taskStateName: '',
  taskStateDetail: '',
  newfeeds: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_MEETING':
    return { 
      ...state,
      meetings: [...state.meetings.slice(0, action.index),...state.meetings.slice(action.index + 1)],
      newfeeds: state.newfeeds.concat(action.newfeed)      
    }
    case 'DELETE_PROJECT':
      return { 
        ...state,
        projects: [...state.projects.slice(0, action.index),...state.projects.slice(action.index + 1)],
        newfeeds: state.newfeeds.concat(action.newfeed)      
      }
    case 'DELETE_TASK':
      return { 
        ...state,
        tasks: [...state.tasks.slice(0, action.index),...state.tasks.slice(action.index + 1)],
        newfeeds: state.newfeeds.concat(action.newfeed)   
      }
    case 'DONE_TASK':
      const allTasks = state.tasks.map(task => {
        if (task.id === action.taskId) {
          let status = 'done'
          task.status = status
        };
        return task;
      });
      return ({ ...state, tasks: allTasks });
    case 'LATE_TASK':
      const allTasks3 = state.tasks.map(task => {
        if (task.id === action.taskId) {
          let status = 'late'
          task.status = status
        };
        return task;
      });
      return ({ ...state, tasks: allTasks3 });
    case 'DONE_CHECKLIST':
      const allTasks2 = state.tasks.map(task => {
        if (task.id === action.taskId) {
          task.checklists.map( checklist => {
            if(checklist.id === action.value.id){
              let checked = !checklist.checked
              checklist.checked = checked
            }
            return checklist
          })
        };
        return task;
      });
      return ({ ...state, tasks: allTasks2 });
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
      })
    case 'ADD_MEETING_END_STATE':
      return {...state,
        meetingStateEndHour : state.meetingStateEndHour.concat(action.hourEnd),
        meetingStateEndMinutes : state.meetingStateEndMinutes.concat(action.minutesEnd),
        meetingStateStartHour : state.meetingStateStartHour.concat(action.hourStart),
        meetingStateStartMinutes : state.meetingStateStartMinutes.concat(action.minutesStart)
      }
    case 'ADD_MEETING_LOCATION_STATE':
      return Object.assign({}, state, {
        meetingStateLocation : action.location
      })
    case 'ADD_MEETING':
      return { 
        ...state,
        meetings: state.meetings.concat(action.meeting),
        allMeetings: state.allMeetings.concat(action.meeting),
        newfeeds: state.newfeeds.concat(action.newfeed)
      }
    case 'ADD_PROJECT':
      return { 
        ...state,
        projects: state.projects.concat(action.project),
        allProjects: state.allProjects.concat(action.project),
        newfeeds: state.newfeeds.concat(action.newfeed)
      }
    case 'JOIN_PROJECT':
      return { 
        ...state,
        projects: state.projects.concat(action.project),
      }
    case 'MEETING_PROJECT':
      return { 
        ...state,
        meetings: state.meetings.concat(action.meeting),
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
    case 'DETAIL_MEETING':
      return Object.assign({}, state, {
        MeetingId: action.id
      })
    default:
      return state
  }
}

const store = createStore(reducer)

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'Kanit-Regular': require('./assets/fonts/Kanit/Kanit-Regular.ttf'),
      'Kanit-Bold': require('./assets/fonts/Kanit/Kanit-Bold.ttf'),
      'Kanit-Light': require('./assets/fonts/Kanit/Kanit-Light.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };
  render() {
    SafeAreaView.setStatusBarHeight(-45);
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
          {
            this.state.fontLoaded ? (
              <View style={[{fontFamily: 'Kanit-Regular'}, styles.container]}>
                  <SafeAreaView style={styles.containerSAV}/>
                    {Platform.OS === 'ios' && <StatusBar barStyle="light-content" /> }
                  <AppNavigator />
              </View>
            ) : null
          }
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
        'Kanit-Regular': require('./assets/fonts/Kanit/Kanit-Regular.ttf'),
        'Kanit-Bold': require('./assets/fonts/Kanit/Kanit-Bold.ttf'),
        'Kanit-Light': require('./assets/fonts/Kanit/Kanit-Light.ttf')
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
  containerSAV: {
    backgroundColor: '#4A3C39',
  }
});
