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

import VoteTime from '../../components/VoteTimeMeeting'

class MeetingScreen extends React.Component { 
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      meeting: {},
      selectedTime: false,
      selectedIndex: 0,
    };
  }

  render() {
      const {navigate} = this.props.navigation;
      let meetingName = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.meetingName
        }
      });
      let id = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.id
        }
      });
      let meetingDetail = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.meetingDetail
        }
      });
      let startDate = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.startDate
        }
      });
      let startHour = []
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return startHour.push(val.startHour)
        }
      });
      let startMinutes = []
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return startMinutes.push(val.startMinutes)
        }
      });
      let endHour = []
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return endHour.push(val.endHour)
        }
      });
      let endMinutes = []
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return endMinutes.push(val.endMinutes)
        }
      });
      let finalStartHour = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.finalStartHour
        }
      });
      let finalStartMinutes = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.finalStartMinutes
        }
      });
      let finalEndHour = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.finalEndHour
        }
      });
      let finalEndMinutes = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.finalEndMinutes
        }
      });
      let meetingLocation = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.meetingLocation
        }
      });
      let onVote = false
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return onVote = val.onVote
        }
      });
      let vote = []
      this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return vote = val.vote
        }
      });
      console.log("hour : ", startHour)
      return (
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.task}>
                <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')}/>
                <View>
                  <Text style={styles.taskText}>{meetingName}</Text>
                  <Text style={styles.taskSubText}>id : {id}</Text>
                  <TouchableOpacity onPress={() => this.props.deleteMeeting(this.props.meetings, this.props.MeetingId, navigate)} style={styles.projectDelete}>
                    <Text style={styles.projectDeleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text>Detail</Text>
              <Text>{meetingDetail}</Text>
              <Text>Date : {startDate}</Text>
              { onVote ?  <Text>Vote Time To Meeting</Text> : <Text>Time To Meeting</Text>}
              { onVote ?  this.renderTime(startHour, startMinutes, endHour, endMinutes) : <Text>{finalStartHour} : {finalStartMinutes} - {finalEndHour} : {finalEndMinutes}</Text>}
              <Text>Location</Text>
              <Text>{meetingLocation}</Text>
              { onVote ? <View style={styles.containerFooter}>
                <View style={styles.footer}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.voteTime(this.state.selectedIndex, this.props.MeetingId, navigate)}>
                    <Text style={styles.signUpText}>Vote Time</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.closeVoteTime(this.props.MeetingId, vote, startHour, startMinutes, endHour, endMinutes, navigate)}>
                    <Text style={styles.signUpText}>Close Vote Time</Text>
                  </TouchableHighlight>
                </View>
              </View>
              : null }
            </ScrollView>
          </View>
      );
  }

  renderTime(startHour, startMinutes, endHour, endMinutes) {
    let checked = false
    let time
    if(startHour[0]) {
      time =  startHour[0].map((key, index)=>{
        checked = false
        if(this.state.selectedTime && this.state.selectedIndex == index){
          checked = true
        }
        return <VoteTime key= {index + key} keyVal={key} startHour={startHour} startMinutes={startMinutes} endHour={endHour} endMinutes={endMinutes} i={index} checked={checked} selectedTime={() => this.selectedTime(index)}/>
      })
    }
    return time
  }

  selectedTime(index) {
    this.setState({ selectedTime: true, selectedIndex: index, });
  }
}

function mapStateToProps(state) {
  return {
    meetings: state.meetings,
    MeetingId: state.MeetingId
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  return {
    deleteMeeting: (meetings, MeetingId, navigate) => {
      meetings.map((val, index)=>{
        if( val.id == MeetingId){
          const i = index
          dispatch({ type: 'DELETE_MEETING',  
          index: i,
          newfeed : {
            'MeetingName': val.meetingName,
            'createDate': timestamp,
            'status': 'deleteMeeting',
          }
        })
        }
      });
      navigate('Meetings');
    },
    voteTime: (index, meetingId, navigate) => {
      dispatch({ type: 'ADD_VOTE_TIME_MEETING',
        index: index, meetingId: meetingId
      })
      navigate('Meetings');
    },
    closeVoteTime: (meetingId, meetingsVote, startHour, startMinutes, endHour, endMinutes, navigate) => {
      let sum = []
      for( let i = 0; i < startHour[0].length; i ++) {
        let j = 0
        meetingsVote.map((val) => {
          console.log("val : ", val)
          if(val == i) {
            j = j + 1
          }
        })
        sum.push(j)
      }
      console.log("sum : ", sum)
      maxVote = Math.max(...sum);
      let indexMaxVoteTime = sum.indexOf(maxVote);
      console.log(indexMaxVoteTime)
      dispatch({ type: 'CLOSE_VOTE_TIME_MEETING',
      finalStartHour: startHour[0][indexMaxVoteTime],
      finalStartMinutes: startMinutes[0][indexMaxVoteTime],
      finalEndHour: endHour[0][indexMaxVoteTime],
      finalEndMinutes: endMinutes[0][indexMaxVoteTime],
      meetingId: meetingId
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
    backgroundColor: "#f5f5dc",
  },
  inputIcon:{
    width:50,
    height:50,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#4A3C39',
    fontFamily: 'Kanit-Bold',
  },
  taskSubText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#4A3C39'
  },
  projectDeleteText: {
    fontSize: 13,
    color: '#f5f5dc',
  },
  projectDelete: {
    backgroundColor: '#4A3C39',
    padding: 10,
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius:5,
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
    borderRadius:10,
  },
  buttonContainerAddList: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    margin: 10,
    marginLeft: 8,
    borderRadius:10,
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
