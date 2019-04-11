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
import { connect } from 'react-redux';

import { Calendar } from 'react-native-calendars';
import { store } from '../../Store/Store';
import moment from "moment";
import DateTimePicker from 'react-native-modal-datetime-picker';

class CreateMeetingEndCalendar extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      hour: '00',
      minutes: '00',
      isDateTimePickerVisible: false,
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        {/* <Text style={styles.textStep}>
          STEP 2/2
        </Text> */}
        <View style={styles.container}>
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/topic2.png')}/>
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
          <DateTimePicker
            mode='time'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <View style={styles.containerPickTime}>
            <TouchableHighlight style={[styles.textPickContainer, styles.bg]}>
              <Text style={styles.signUpText}>End time {this.state.hour} : {this.state.minutes}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.buttonPickContainer, styles.signupButton]} onPress={this._showDateTimePicker}>
              <Text style={styles.signUpText}>Pick End time</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.Continue(this.state.date, this.state.hour, this.state.minutes, navigate)}>
            <Text style={styles.signUpText}>Continue</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  // continue(date, hour, minutes, navigate){
  //   if(date){
  //     store.meetingState.endDate = date;
  //     store.meetingState.endHour = hour;
  //     store.meetingState.endMinutes = minutes;
  //     navigate('LocationMeeting')
  //   }
  // }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.getHours());
    console.log('A date has been picked: ', date.getMinutes());
    this.setState({ hour: date.getHours(),minutes: date.getMinutes()})
    this._hideDateTimePicker();
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Continue: (date, hour, minutes, navigate) => {
      dispatch({ type: 'ADD_MEETING_END_STATE',
        date: date, hour : hour, minutes: minutes
      })
      navigate('LocationMeeting')
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateMeetingEndCalendar)

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
  containerPickTime: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  buttonPickContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginLeft: 5,
    marginTop: 30,
    borderRadius: 10,
  },
  textPickContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginLeft: 15,
    marginTop: 25,
    borderRadius: 10,
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  bg: {
    backgroundColor: "#FFFFFF",
  },
  signUpText: {
    color: '#4A3C39',
  },
});