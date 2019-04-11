import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, StyleSheet, TouchableHighlight} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from "moment";
import { connect } from 'react-redux';

class LocationMeeting extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/topic2.png')}/>
          <GooglePlacesAutocomplete
              placeholder='Enter a location...'
              minLength={1}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                // this.setState({location: data});
                this.props.AddLocation(data.description);
              }}
              styles={{
                container: {
                  marginLeft: 20,
                  marginRight: 20,
                  zIndex: 100,
                },
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  fontFamily: 'Kanit-Regular',
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
                listView: {
                  backgroundColor: 'white',
                },
              }}
              currentLocation={false}
            
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBaE63Omw8dU2YuHyxuWI48HilVUbXf5SY',
              language: 'en', // language of the results
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food'
            }}
          />      
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.AddMeeting(this.props.meetingStateName, this.props.meetingStateDetail, this.props.meetingStateStartDate, this.props.meetingStateStartHour, this.props.meetingStateStartMinutes, this.props.meetingStateEndDate, this.props.meetingStateEndHour, this.props.meetingStateEndMinutes, this.props.meetingStateLocation, navigate)}>
            <Text style={styles.signUpText}>Add Meeting</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  // addMeeting(location, navigate) {
  //   var timestamp = moment().format();
  //   var text = "";
  //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  //   for (var i = 0; i < 5; i++)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   store.meetingArray.push({
  //     'meetingName': store.meetingState.name,
  //     'meetingDetail': store.meetingState.details,
  //     'createDate': timestamp,
  //     'id': text,
  //     'startDate': store.meetingState.startDate.dateString,
  //     'startHour': store.meetingState.startHour,
  //     'startMinutes': store.meetingState.startMinutes,
  //     'endDate': store.meetingState.endDate.dateString,
  //     'endHour': store.meetingState.endHour,
  //     'endMinutes': store.meetingState.endMinutes,
  //     'status': 'join',
  //     'meetingLocation': store.meetingState.location,
  //   });
  //   this.setState({location:{}});
  //   navigate('Meetings');
  // }
}

function mapStateToProps(state) {
  return {
    meetingStateName: state.meetingStateName,
    meetingStateDetail: state.meetingStateDetail,
    meetingStateStartDate: state.meetingStateStartDate,
    meetingStateStartHour: state.meetingStateStartHour,
    meetingStateStartMinutes: state.meetingStateStartMinutes,
    meetingStateEndDate: state.meetingStateEndDate,
    meetingStateEndHour: state.meetingStateEndHour,
    meetingStateEndMinutes: state.meetingStateEndMinutes,
    meetingStateLocation: state.meetingStateLocation,
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return {
    AddMeeting: (name, detail, startDate, startHour, startMinutes, endDate, endHour, endMinutes, location, navigate) => {
      dispatch({ type: 'ADD_MEETING',
        meeting: {
          'meetingName': name,
          'meetingDetail': detail,
          'createDate': timestamp,
          'id': text,
          'startDate': startDate.dateString,
          'startHour': startHour,
          'startMinutes': startMinutes,
          'endDate': endDate.dateString,
          'endHour': endHour,
          'endMinutes': endMinutes,
          'status': 'join',
          'meetingLocation': location,
        }, newfeed : {
          'meetingName': name,
          'createDate': timestamp,
          'id': text,
          'status': 'createMeeting',
        }
      })
      navigate('Meetings');
    },
    AddLocation: (location) => {
      dispatch({ type: 'ADD_MEETING_LOCATION_STATE',
        location: location
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationMeeting)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  topicContainer: {
    width: '100%',
    height: 100,
    marginTop: '50%',
  },
  containerLocation: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    height:45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    top: '52%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
  },
});