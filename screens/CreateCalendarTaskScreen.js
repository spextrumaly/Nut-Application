import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Image,
  ImageBackground
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from "moment";
import { connect } from 'react-redux'
import * as firebase from 'firebase';
import { fetchAllTask } from '../src/fetchData';
import AwesomeButton from "react-native-really-awesome-button";
class CalendarScreenTask extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handlePressInContinue = this.handlePressInContinue.bind(this);
    this.handlePressOutContinue = this.handlePressOutContinue.bind(this);
    this.state = {
      date: '',
      markedDates: ''
    }
  }
  componentWillMount() {
    this.animatedValueContinue = new Animated.Value(1);
  }
  handlePressInContinue() {
    Animated.spring(this.animatedValueContinue, {
      toValue: .75
    }).start()
  }
  handlePressOutContinue(navigate) {
    Animated.spring(this.animatedValueContinue, {
      toValue: 1,
    }).start(() => {
      this.props.addTask(this.state.date, this.props.taskStateName, this.props.taskStateDetail, this.props.ProjectId, this.props.userDetail.name, navigate)
    })
  }
  render() {
    const {navigate} = this.props.navigation;
    const animatedStyleContinue = {
      transform: [{ scale: this.animatedValueContinue}]
    }
    return (
      <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        {/* <Text style={styles.textStep}>
          STEP 2/2
        </Text> */}
        <View style={styles.container}>
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../assets/images/topic2.png')}/>
          <Calendar
            style={{
              borderRadius: 30,
              width: '90%',
              paddingBottom: 15,
              paddingTop: 10,
              opacity: 0.8
            }}
            theme={{
              backgroundColor: '#7B6B68',
              textDayFontFamily: 'Kanit-Regular',
              textMonthFontFamily: 'Kanit-Bold',
              textDayHeaderFontFamily: 'Kanit-Bold',
              textTodayFontFamily: 'Kanit-Regular',
              calendarBackground: '#7B6B68',
              textSectionTitleColor: '#e6e0df',
              selectedDayBackgroundColor: '#f5f3f2',
              selectedDayTextColor: '#7B6B68',
              todayTextColor: '#808080',
              dayTextColor: '#f5f3f2',
              textDisabledColor: '#808080',
              dotColor: '#f5f3f2',
              selectedDotColor: '#ffffff',
              arrowColor: '#f5f3f2',
              monthTextColor: '#e6e0df',
            }}
            markedDates={{[this.state.markedDates]: { selected: true },}}
            onDayPress={(day) => {this.setState({date:day, markedDates:day.dateString})}}
          />
            <AwesomeButton
                style={{ marginTop: 20, opacity: 0.8}}
                backgroundDarker='#4A3C39'
                backgroundColor='#7B6B68'
                width={250}
                borderRadius={30}
                onPress={() => this.handlePressOutContinue(navigate)}
              >
                <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Add Task</Text>
              </AwesomeButton>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    taskStateName: state.taskStateName,
    taskStateDetail: state.taskStateDetail,
    ProjectId: state.ProjectId,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return {
    addTask: (date, name, detail, projectId, ownerName, navigate) => {
      let projectRef = firebase.database().ref('project/'+projectId+'/task')
      let taskRef = firebase.database().ref('task/')
      taskRef.push({
          'name': name,
          'ProjectID': projectId,
          'createDate': timestamp,
          'task': name,
          'description': detail,
          'status': 'active',
          'deadlineDate': date.dateString,
          'checklists': false,
          'ownerName': ownerName
        })
        .then((snap) => {
          const key = snap.key;
          taskRef.child(key).update({
            id : key
          })
          projectRef.child(key).update({
            timestamp : Date.now()
        })
      })
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTask((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK', payload: tasks })
      }, projectId)
      navigate('Project');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreenTask)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicContainer: {
    width: '100%',
    height: 100,
  },
  textStep: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#f5f5dc',
    textAlign: 'center',
  },
  textHeader: {
    fontSize: 30,
    paddingTop: 10,
    color: '#f5f5dc',
    marginBottom:20,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    marginLeft: 5,
    marginTop: 25,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  },
});