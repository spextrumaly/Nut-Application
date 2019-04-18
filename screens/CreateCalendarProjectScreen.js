import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from "moment";
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { fetchAllProject } from '../src/fetchData';

class CalendarScreen extends Component {
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
      this.props.AddProject(this.state.date, this.props.projectStateName, this.props.projectStateDetail, navigate)
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
            }}
            theme={{
              backgroundColor: '#f5f5dc',
              textDayFontFamily: 'Kanit-Regular',
              textMonthFontFamily: 'Kanit-Bold',
              textDayHeaderFontFamily: 'Kanit-Bold',
              textTodayFontFamily: 'Kanit-Regular',
              calendarBackground: '#f5f5dc',
              textSectionTitleColor: '#372c2a',
              selectedDayBackgroundColor: '#4A3C39',
              selectedDayTextColor: '#f5f5dc',
              todayTextColor: '#d0d7dd',
              dayTextColor: '#4A3C39',
              textDisabledColor: '#d0d7dd',
              dotColor: '#4A3C39',
              selectedDotColor: '#ffffff',
              arrowColor: '#4A3C39',
              monthTextColor: '#372c2a',
            }}
            markedDates={{[this.state.markedDates]: { selected: true },}}
            onDayPress={(day) => {this.setState({date:day, markedDates:day.dateString})}}
          />
          <TouchableWithoutFeedback
            onPressIn={this.handlePressInContinue}
            onPressOut={() => this.handlePressOutContinue(navigate)}
          >
            <Animated.View style={[styles.buttonContainer, styles.signupButton, animatedStyleContinue]}>
              <Text style={styles.signUpText}>Add Project</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
      projects: state.projects,
      projectStateName: state.projectStateName,
      projectStateDetail: state.projectStateDetail,
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return {
    AddProject: (date, name, detail, navigate) => {
      let uID = firebase.auth().currentUser.uid;
      console.log(uID)
      projectRef = firebase.database().ref('project/')
      userRef = firebase.database().ref('user/' + uID +'/project/')
      console.log('press create project');
      //add to ref/project
      projectRef.push({
        'name': name,
        'detail':detail,
        'createDate': timestamp,
        //'id': text,
        'deadlineDate': date.dateString,
        
      member : {
        [uID] : {
          timestamp : Date.now(),
          status : 'master'
          }
        }
      }).then((snap) =>{
        newKey = snap.key
        projectRef.child(newKey).update({
          id : newKey
        })
        userRef.update({
        [newKey] : true
        })
      })
      dispatch({ type: 'FETCH_CLEAR_ALL_PROJECT' })
      fetchAllProject((projects) => {
        dispatch({ type: 'FETCH_ALL_PROJECT', payload: projects })
      })
      navigate('HomeProject');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)


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
    fontFamily: 'Kanit-Regular'
  },
});