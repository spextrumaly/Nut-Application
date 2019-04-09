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
import moment from "moment";
import { connect } from 'react-redux'

class CalendarScreen extends Component {
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
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.AddProject(this.state.date, this.props.projectStateName, this.props.projectStateDetail, navigate)}>
            <Text style={styles.signUpText}>Add Project</Text>
          </TouchableHighlight>
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
      dispatch({ type: 'ADD_PROJECT',  
        project: {
          'ProjectName': name,
          'projectDetail':detail,
          'createDate': timestamp,
          'id': text,
          'deadlineDate': date.dateString,
          'status': 'join',
        }, newfeed : {
          'ProjectName': name,
          'ProjectID': text,
          'createDate': timestamp,
          'id': text,
          'status': 'createProject',
        }
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
  },
});