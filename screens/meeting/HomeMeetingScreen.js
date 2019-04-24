import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Clipboard,
  AlertIOS,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import * as firebase from 'firebase';
import VoteTime from '../../components/VoteTimeMeeting'
import { addVote, lineShare, fetchMemberMeeting } from '../../src/fetchData';
import AwesomeButton from "react-native-really-awesome-button";

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

  componentDidMount() {
    this.props.fetchDispatchAllMemberMeeting(this.props.MeetingId)
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
        console.log(val)
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
    let ownerNameMeeting
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        ownerNameMeeting = val.ownerName
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
    this.props.meetingsPlan.map((val) => {
      if (val.id == this.props.MeetingId) {
        member = val.member
      }
    });
    let member
    this.props.meetings.map((val) => {
      if (val.id == this.props.MeetingId) {
        member = val.member
      }
    });
    let members = this.props.memberNameMeeting.map((val)=>{
      if(val) {
        return <Text style={styles.memberText}>{val}, </Text>
      }
    })

    console.log('mb', members)
    
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        <ScrollView>
          <View style={styles.task}>
            <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')} />
            <View style={styles.headMeeting}>
              <Text style={styles.taskText}>{onVote ? meetingPlanName : meetingName}</Text>
              <Text style={styles.taskSubText}
                    onPress={() => {!onVote ? Clipboard.setString(id.toString()) : Clipboard.setString(idPlan.toString()); AlertIOS.alert('Alert', 'Copied MeetingID to clipboard!'); }}>
                    MeetingID: {!onVote ? id : idPlan}</Text>
            {!onVote ? 
              <View style={styles.project}>
                {members}
              </View> 
              : null
            }
            </View>
          </View>
          <View style={styles.containerMeeting}>
            <Text style={styles.detail}>DETAIL</Text>
            <Text style={styles.meetingDetail}>{!onVote ? meetingDetail : meetingPlanDetail}</Text>
            <Text style={styles.meetingDate}>DATE : {!onVote ? startDate : startDatePlan}</Text>
            {onVote ? <Text  style={styles.meetingDate} >SELECT MEETING TIME</Text> : <Text  style={styles.meetingDate}>MEETING TIME</Text>}
            {onVote ? this.renderTime(startHourPlan, startMinutesPlan, endHourPlan, endMinutesPlan) : <Text style={styles.meetingDetail}>{startHour} : {startMinutes} - {endHour} : {endMinutes}</Text>}
            <Text  style={styles.meetingDate} >LOCATION</Text>
            <Text style={styles.meetingDetail}>{!onVote ? meetingLocation : meetingLocationPlan}</Text>
            <Text  style={styles.hostBy} >Host By {!onVote ? ownerNameMeeting : ownerName}</Text>
          </View>
          {/* <AwesomeButton
            style={{opacity: 0.8}}
            backgroundDarker='#4A3C39'
            backgroundColor='#7B6B68'
            stretch={true}
            borderRadius={30}
            onPress={() => lineShare(this.props.MeetingId, 'meeting')}>
            <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Invite</Text>
          </AwesomeButton> */}
          { !onVote ?
            <View style={styles.containerFooter}>
              <View style={styles.footer}>
                <AwesomeButton
                    style={{opacity: 0.8}}
                    backgroundDarker='#4A3C39'
                    backgroundColor='#7B6B68'
                    stretch={true}
                    borderRadius={30}
                    onPress={() => this.props.deleteMeeting(this.props.MeetingId, navigate)}>
                    <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Delete</Text>
                  </AwesomeButton>
              </View>
            </View>
            : 
            <View style={styles.containerFooter}>
              <View style={styles.footer}>
                <AwesomeButton
                    style={{opacity: 0.8}}
                    backgroundDarker='#4A3C39'
                    backgroundColor='#7B6B68'
                    stretch={true}
                    borderRadius={30}
                    onPress={() => lineShare(this.props.MeetingId, 'meeting')}>
                    <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Invite</Text>
                  </AwesomeButton>
              </View>
            </View>
          }
          {onVote ? <View style={styles.containerFooter}>
              <View style={styles.footer}>
                {!showCloseVote ?
                  <AwesomeButton
                    style={{opacity: 0.8}}
                    backgroundDarker='#4A3C39'
                    backgroundColor='#7B6B68'
                    stretch={true}
                    borderRadius={30}
                    onPress={() => this.props.voteTime(this.state.selectedIndex, this.props.MeetingId, navigate)}>
                    <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Vote</Text>
                  </AwesomeButton>
                  :
                  null
                }
                {showCloseVote ?
                  <AwesomeButton
                    style={{opacity: 0.8}}
                    backgroundDarker='#4A3C39'
                    backgroundColor='#7B6B68'
                    width={250}
                    stretch={true}
                    borderRadius={30}
                    onPress={() => this.props.closeVoteTime(this.props.MeetingId, vote, startHourPlan, startMinutesPlan, endHourPlan, endMinutesPlan, navigate, meetingPlanName, meetingPlanDetail, meetingLocationPlan, meetingOnProjectId, ownerName, startDatePlan, member)}>
                    <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Close Voting</Text>
                  </AwesomeButton>
                  :
                  null
                }
              </View>
            </View>
              : null}
        </ScrollView>
          </ImageBackground>
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
    meetingsPlan: state.meetingsPlan,
    memberNameMeeting: state.memberNameMeeting
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  return {
    fetchDispatchAllMemberMeeting: (id) => {
      dispatch({ type: 'FETCH_CLEAR_MEMBER_MEETING' })
      fetchMemberMeeting((members) => {
        dispatch({ type: 'FETCH_ALL_MEMBER_MEETING', payload: members })
      }, id)
    },
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
    backgroundColor: '#4A3C39',
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
  memberText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Kanit-Medium',
    fontSize: 10,
    opacity: 0.7,
    paddingLeft: 4,
    color: '#4A3C39'
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
    color: '#f5f5dc',
    fontFamily: 'Kanit-Regular'
  },
  projectDeleteText: {
    fontSize: 13,
    color: '#4A3C39',
  },
  projectDelete: {
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
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  },
  containerFooter: {
    margin: 10,
    marginTop: 5,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  detail: {
    color: '#4A3C39',
    fontSize: 18,
    fontFamily: 'Kanit-Medium',
    paddingLeft: 15,
    
  },
  meetingDetail: {
    color: '#4A3C39',
    fontSize: 15,
    paddingLeft: 25,
    marginRight: 25,
    fontFamily: 'Kanit-Regular',
    paddingBottom: 12,
  },
  containerMeeting: {
    backgroundColor: "#f5f3f2",
    opacity: 0.6,
    margin: 20,
    borderRadius: 10,
    
    paddingTop: 15
  },
  meetingDate: {
    color: '#4A3C39',
    fontSize: 18,
    paddingLeft: 15,
    fontFamily: 'Kanit-Medium',
    paddingBottom: 12,
  },
  hostBy: {
    color: '#4A3C39',
    fontSize: 13,
    paddingLeft: 15,
    fontFamily: 'Kanit-Italic',
    paddingBottom: 12,
  },
  headMeeting: {
    marginTop: 20,
  },
  project: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth:1,
    borderBottomColor: '#f5f5dc',
    borderTopWidth:1,
    borderTopColor: '#f5f5dc',
    marginLeft: 10,
    marginTop: 10,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    backgroundColor: '#f5f5dc',
    borderRadius: 5,
    opacity: 0.75,
  },
});
