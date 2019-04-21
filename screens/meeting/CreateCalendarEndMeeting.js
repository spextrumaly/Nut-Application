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
import AwesomeButton from "react-native-really-awesome-button";
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
      hourStart: '00',
      minutesStart: '00',
      hourEnd: '00',
      minutesEnd: '00',
      isDateTimePickerVisible: false,
      isDateTimePickerVisibleEnd: false,
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
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/time-pick.png')}/>
          <DateTimePicker
            mode='time'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <DateTimePicker
            mode='time'
            isVisible={this.state.isDateTimePickerVisibleEnd}
            onConfirm={this._handleDatePickedEnd}
            onCancel={this._hideDateTimePickerEnd}
          />
          <View style={styles.containerPickTime}>
            <TouchableHighlight style={[styles.textPickContainer, styles.bg]}>
              <Text style={styles.signUpText}>Start time {this.state.hourStart} : {this.state.minutesStart}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.buttonPickContainer, styles.signupButton]} onPress={this._showDateTimePicker}>
              <Text style={styles.signUpText}>Pick Start time</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerPickTime}>
            <TouchableHighlight style={[styles.textPickContainer, styles.bg]}>
              <Text style={styles.signUpText}>End time {this.state.hourEnd} : {this.state.minutesEnd}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.buttonPickContainer, styles.signupButton]} onPress={this._showDateTimePickerEnd}>
              <Text style={styles.signUpText}>Pick End time</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.addMoreTime(this.state.hourStart, this.state.minutesStart, this.state.hourEnd, this.state.minutesEnd)}>
            <Text style={styles.signUpText}>Add More Time</Text>
          </TouchableHighlight>
            <AwesomeButton
                style={{opacity: 0.8}}
                backgroundDarker='#4A3C39'
                backgroundColor='#7B6B68'
                width={250}
                borderRadius={30}
                onPress={() => this.props.Continue(this.state.hourStart, this.state.minutesStart, this.state.hourEnd, this.state.minutesEnd, navigate)}>
              
                <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Continue</Text>
              </AwesomeButton>
        </View>
      </ImageBackground>
    );
  }

  addMoreTime = () => {
    this.props.addMoreTime(this.state.hourStart, this.state.minutesStart, this.state.hourEnd, this.state.minutesEnd)
    this.setState({ hourStart: "00",minutesStart: "00"})
    this.setState({ hourEnd: "00",minutesEnd: "00"})
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date)
    console.log('A date has been picked: ', date.getHours());
    console.log('A date has been picked: ', date.getMinutes());
    this.setState({ hourStart: date.getHours(),minutesStart: date.getMinutes()})
    this._hideDateTimePicker();
  };

  _showDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: true });

  _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: false });

  _handleDatePickedEnd = (date) => {
    console.log('A date has been picked: ', date.getHours());
    console.log('A date has been picked: ', date.getMinutes());
    this.setState({ hourEnd: date.getHours(),minutesEnd: date.getMinutes()})
    this._hideDateTimePickerEnd();
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Continue: (hourStart, minutesStart, hourEnd, minutesEnd, navigate) => {
      dispatch({ type: 'ADD_MEETING_END_STATE',
        hourStart : hourStart, minutesStart: minutesStart,
        hourEnd : hourEnd, minutesEnd: minutesEnd
      })
      navigate('LocationMeeting')
    },
    addMoreTime: (hourStart, minutesStart, hourEnd, minutesEnd) => {
      dispatch({ type: 'ADD_MEETING_END_STATE',
        hourStart : hourStart, minutesStart: minutesStart,
        hourEnd : hourEnd, minutesEnd: minutesEnd
      })
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
    fontFamily: 'Kanit-Medium'
  },
});