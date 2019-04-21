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
import DateTimePicker from 'react-native-modal-datetime-picker';

class CreateMeetingCalendar extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      markedDates: '',
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
                onPress={() => this.props.Continue(this.state.date, navigate)}>
                <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Continue</Text>
              </AwesomeButton>
        </View>
      </ImageBackground>
    );
  }

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
    Continue: (date, navigate) => {
      dispatch({ type: 'ADD_MEETING_START_STATE',
        date: date
      })
      navigate('CalendarMeetingEnd')
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateMeetingCalendar)

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