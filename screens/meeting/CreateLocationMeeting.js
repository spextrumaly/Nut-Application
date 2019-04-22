import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, StyleSheet, TouchableHighlight} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from "moment";
import { connect } from 'react-redux';
import { fetchAllMeetingPlan } from '../../src/fetchData';
import * as firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";
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
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/where.png')}/>
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
          <View style={styles.buttonDiv}>
            <AwesomeButton
              style={styles.buttonContainer}
              backgroundDarker='#4A3C39'
              backgroundColor='#7B6B68'
              width={300}
              borderRadius={30}
              onPress={() => this.props.AddMeeting(this.props.meetingStateName, this.props.meetingStateDetail, this.props.meetingStateStartDate, this.props.meetingStateStartHour, this.props.meetingStateStartMinutes, this.props.meetingStateEndHour, this.props.meetingStateEndMinutes, this.props.meetingStateLocation, this.props.meetingOnProjectId, this.props.userDetail.name, navigate, this.props.projects)}>
              <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Add Meeting</Text>
            </AwesomeButton>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    meetingStateName: state.meetingStateName,
    meetingStateDetail: state.meetingStateDetail,
    meetingStateStartDate: state.meetingStateStartDate,
    meetingStateStartHour: state.meetingStateStartHour,
    meetingStateStartMinutes: state.meetingStateStartMinutes,
    meetingStateEndHour: state.meetingStateEndHour,
    meetingStateEndMinutes: state.meetingStateEndMinutes,
    meetingStateLocation: state.meetingStateLocation,
    meetingOnProjectId: state.meetingOnProjectId,
    userDetail: state.userDetail,
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return {
    AddMeeting: (name, detail, startDate, startHour, startMinutes, endHour, endMinutes, location, meetingOnProjectId, ownerName, navigate, projects) => {
      let uID = firebase.auth().currentUser.uid;
      meetingRef = firebase.database().ref('meetingPlan/')
      userRef = firebase.database().ref('user/' + uID +'/meetingPlan/')
      let member
      if(meetingOnProjectId) {
        projects.map((val) => {
          if(val){
            if(val.id == meetingOnProjectId) {
              member = val.member
            }
          }
        })
      } else {
        member = {
          [uID] : {
            timestamp : Date.now(),
            status : 'master'
            }
        }
      }
      console.log("MMMM : ", member)
      meetingRef.push({
        'meetingName': name,
        'meetingDetail': detail,
        'createDate': timestamp,
        'startDate': startDate.dateString,
        'startHour': startHour,
        'startMinutes': startMinutes,
        'endHour': endHour,
        'endMinutes': endMinutes,
        'meetingLocation': location,
        'meetingOnProjectId': meetingOnProjectId,
        'onVote': true,
        'vote': false,
        'countVote': 0,
        'ownerName': ownerName,
        
      member : member
      }).then((snap) =>{
        newKey = snap.key
        meetingRef.child(newKey).update({
          id : newKey
        })
        if(meetingOnProjectId) {
          Object.keys(member).map(key => {
            userRef = firebase.database().ref('user/' + key + '/meetingPlan/')
            userRef.update({
              [newKey]: true
            })
          })
        } else {
          userRef.update({
            [newKey] : true
            })
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
  buttonDiv: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    opacity: 0.8,

  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  },
});