import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { store } from '../Store/Store';
import moment from "moment";

export default class CalendarScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
        {/* <Text style={styles.textStep}>
          STEP 2/2
        </Text> */}
        <View style={styles.container}>
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../assets/images/topic2.png')}/>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              width: '90%',
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#b6c1cd',
              selectedDayTextColor: '#4A3C39',
              todayTextColor: '#f5f5dc',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#4A3C39',
              selectedDotColor: '#ffffff',
              arrowColor: '#4A3C39',
              monthTextColor: '#4A3C39',
            }}
            onDayPress={(day) => {this.setState({date:day})}}
          />
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.addTask(this.state.date, navigate)}>
            <Text style={styles.signUpText}>Add Task</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  addTask(date, navigate){
    var timestamp = moment().format();
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    if(date){
      var d = new Date();
      store.taskArray.push({
        'ProjectName': store.ProjectName,
        'ProjectID': store.ProjectId,
        'createDate': timestamp,
        'task': store.taskState.name,
        'id': text,
        'description': store.taskState.details,
        'status': 'active',
        'deadlineDate': date.dateString,
      });
      store.newFeedArray.push({
        'ProjectName': store.ProjectName,
        'ProjectID': store.ProjectID,
        'task': store.taskState.name,
        'createDate': timestamp,
        'id': text,
        'status': 'createTask',
      });
      this.setState({date:''});
      store.TaskName = store.taskState.name;
      store.TaskId = text;
      navigate('HomeTask');
    }
  }
}

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
  },
});