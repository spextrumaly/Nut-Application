import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import * as firebase from 'firebase';
import VoteTime from '../../components/VoteTimeMeeting'
import { addVote, fetchAllMeetingPlan, fetchAllMeeting } from '../../src/fetchData';

class MeetingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      meeting: {},
      selectedTime: false,
      selectedIndex: [],
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    let meetingName
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingName = val.meetingName
      }
    });
    let meetingPlanName
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingPlanName = val.meetingName
      }
    });
    let id
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return id = val.id
      }
    });
    let idPlan
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return idPlan = val.id
      }
    });
    let meetingDetail
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return meetingDetail = val.meetingDetail
      }
    });
    let meetingPlanDetail
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingPlanDetail = val.meetingDetail
      }
    });
    let startDate
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        startDate = val.startDate
      }
    });
    let startDatePlan
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        startDatePlan = val.startDate
      }
    });
    let startHour = []
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return startHour.push(val.startHour)
      }
    });
    let startHourPlan = []
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return startHourPlan.push(val.startHour)
      }
    });
    let startMinutes = []
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return startMinutes.push(val.startMinutes)
      }
    });
    let startMinutesPlan = []
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return startMinutesPlan.push(val.startMinutes)
      }
    });
    let endHour = []
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return endHour.push(val.endHour)
      }
    });
    let endHourPlan = []
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return endHourPlan.push(val.endHour)
      }
    });
    let endMinutes = []
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return endMinutes.push(val.endMinutes)
      }
    });
    let endMinutesPlan = []
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return endMinutesPlan.push(val.endMinutes)
      }
    });
    let meetingLocation
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingLocation = val.meetingLocation
      }
    });
    let meetingLocationPlan
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingLocationPlan = val.meetingLocation
      }
    });
    let ownerName
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        ownerName = val.ownerName
      }
    });
    let meetingOnProjectId
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        meetingOnProjectId = val.meetingOnProjectId
      }
    });
    let onVote = false
    if (this.props.meetings) {
      this.props.meetings.map((val) => {
        if (val.id == this.props.MeetingId) {
          return onVote = val.onVote
        }
      });
    }
    if (this.props.meetingsPlan) {
      this.props.meetingsPlan.map((val) => {
        if (val.id == this.props.MeetingId) {
          return onVote = val.onVote
        }
      });
    }
    let vote = []
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        return vote = val.vote
      }
    });
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        return vote = val.vote
      }
    });

    let showCloseVote = false
    let uId = firebase.auth().currentUser.uid
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        if (val.member[uId].status == 'master') {
          showCloseVote = true
        }
      }
    });
    let member
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        member = val.member
      }
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.task}>
            <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')} />
            <View>
              <Text style={styles.taskText}>{onVote ? meetingPlanName : meetingName}</Text>
              <Text style={styles.taskSubText}>id : {!onVote ? id : idPlan}</Text>
              { !onVote ?
                <TouchableOpacity onPress={() => this.props.deleteMeeting(this.props.MeetingId, navigate)} style={styles.projectDelete}>
                  <Text style={styles.projectDeleteText}>Delete</Text>
                </TouchableOpacity>
                : 
                null
              }
            </View>
          </View>
          <Text>Detail</Text>
          <Text>{!onVote ? meetingDetail : meetingPlanDetail}</Text>
          <Text>Date : {!onVote ? startDate : startDatePlan}</Text>
          {onVote ? <Text>Vote Time To Meeting</Text> : <Text>Time To Meeting</Text>}
          {onVote ? this.renderTime(startHourPlan, startMinutesPlan, endHourPlan, endMinutesPlan) : <Text>{startHour} : {startMinutes} - {endHour} : {endMinutes}</Text>}
          <Text>Location</Text>
          <Text>{!onVote ? meetingLocation : meetingLocationPlan}</Text>
          {onVote ? <View style={styles.containerFooter}>
            <View style={styles.footer}>
              {!showCloseVote ?
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.voteTime(this.state.selectedIndex, this.props.MeetingId, navigate)}>
                  <Text style={styles.signUpText}>Vote Time</Text>
                </TouchableHighlight>
                :
                null
              }
              {showCloseVote ?
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.closeVoteTime(this.props.MeetingId, vote, startHourPlan, startMinutesPlan, endHourPlan, endMinutesPlan, navigate, meetingPlanName, meetingPlanDetail, meetingLocationPlan, meetingOnProjectId, ownerName, startDatePlan, member)}>
                  <Text style={styles.signUpText}>Close Vote Time</Text>
                </TouchableHighlight>
                :
                null
              }
            </View>
          </View>
            : null}
        </ScrollView>
      </View>
    );
  }

  renderTime(startHour, startMinutes, endHour, endMinutes) {
    let checked = false
    let time
    if (startHour[0]) {
      time = startHour[0].map((key, index) => {
        checked = false
        if (this.state.selectedTime && this.state.selectedIndex.includes(index)) {
          checked = !checked
        }
        return <VoteTime key={index + key} keyVal={key} startHour={startHour} startMinutes={startMinutes} endHour={endHour} endMinutes={endMinutes} i={index} checked={checked} selectedTime={() => this.selectedTime(index)} />
      })
    }
    return time
  }

  selectedTime(index) {
    let selectedIndex
    if (this.state.selectedIndex.includes(index)) {
      selectedIndex = this.state.selectedIndex.filter((i) => {
        i != index
      })
    } else {
      selectedIndex = [...this.state.selectedIndex, index]
    }
    this.setState({ selectedTime: true, selectedIndex });
  }
}

function mapStateToProps(state) {
  return {
    meetings: state.meetings,
    MeetingId: state.MeetingId,
    meetingsPlan: state.meetingsPlan
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  return {
    deleteMeeting: (meetingId, navigate) => {
      const deleteMeetingAll = (cb) => {
        firebase.database().ref('meeting/' + meetingId).once('value')
          .then(function (snapshot) {
            Object.keys(snapshot.val().member).map((key) => {
              userRef = firebase.database().ref('user/' + key + '/meeting/' + meetingId)
              userRef.remove()
              if (cb) {
                cb()
              }
            })
          })

      }
      const deleteUserMeeting = () => {
        deleteMeetingAll(() => {
          firebase.database().ref('meeting/' + meetingId).remove()
        });
      }

      deleteUserMeeting();
      navigate('Meetings');
    },
    voteTime: (index, meetingId, navigate) => {
      addVote(index, meetingId);
      // dispatch({ type: 'FETCH_CLEAR_ALL_MEETING_PLAN' })
      // fetchAllMeetingPlan((meetings) => {
      //   dispatch({ type: 'FETCH_ALL_MEETING_PLAN', payload: meetings })
      // })
      navigate('Meetings');
    },
    closeVoteTime: (meetingId, meetingsVote, startHour, startMinutes, endHour, endMinutes, navigate, name, detail, location, meetingOnProjectId, ownerName, startDatePlan, member) => {
      var timestamp = moment().format();
      let sum = []
      for (let i = 0; i < startHour[0].length; i++) {
        let voteScore = Object.keys(meetingsVote).filter(key => meetingsVote[key] === i).length
        sum.push(voteScore)
      }
      maxVote = Math.max(...sum);
      Object.keys(member).map(key => {
        console.log(key)
      })
      let indexMaxVoteTime = sum.indexOf(maxVote);
      firebase.database().ref('meetingPlan/' + meetingId).remove()
      meetingRef = firebase.database().ref('meeting/' + meetingId)
      //add to ref/project
      meetingRef.update({
        'meetingName': name,
        'meetingDetail': detail,
        'createDate': timestamp,
        'startDate': startDatePlan,
        'startHour': startHour[0][indexMaxVoteTime],
        'startMinutes': startMinutes[0][indexMaxVoteTime],
        'endHour': endHour[0][indexMaxVoteTime],
        'endMinutes': endMinutes[0][indexMaxVoteTime],
        'meetingLocation': location,
        'meetingOnProjectId': meetingOnProjectId,
        'ownerName': ownerName,
        'onVote': false,
        'id': meetingId,
        member: member
      }).then(() => {
        Object.keys(member).map(key => {
          userRef = firebase.database().ref('user/' + key + '/meeting/')
          userRef.update({
            [meetingId]: true
          })
          firebase.database().ref('user/' + key + '/meetingPlan/' + meetingId).remove()
        })
      })
      navigate('Meetings');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollViewHolder: {
    flex: 1,
  },
  scrollViewHolder:
  {
    margin: 10,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  item:
  {
    backgroundColor: '#D3D3D3',
    flex: 1,
    padding: 10,
    marginRight: 10,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  textSubHeader: {
    textAlign: 'left',
    fontSize: 14,
    padding: 5,
  },
  textSubHeaderCenter: {
    textAlign: 'center',
    fontSize: 14,
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
    paddingTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 40,
    backgroundColor: '#4A3C39',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24
  },
  task: {
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    backgroundColor: "#4A3C39",
  },
  inputIcon: {
    width: 50,
    height: 50,
    margin: 5,
    marginTop: 35,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f5f5dc',
    fontFamily: 'Kanit-Bold',
  },
  taskSubText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f5f5dc'
  },
  projectDeleteText: {
    fontSize: 13,
    color: '#4A3C39',
  },
  projectDelete: {
    backgroundColor: '#f5f5dc',
    padding: 10,
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    margin: 10,
    marginBottom: 5,
  },
  headCard: {
    fontSize: 17,
    color: '#4A3C39',
    marginBottom: 10,
  },
  buttonContainer: {
    height: 45,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: 5,
    borderRadius: 10,
  },
  buttonContainerAddList: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    margin: 10,
    marginLeft: 8,
    borderRadius: 10,
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Regular'
  },
  containerFooter: {
    margin: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
  },
});
