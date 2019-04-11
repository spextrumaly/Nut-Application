import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";

class MeetingScreen extends React.Component { 
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
        meeting: {},
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
      let startHour = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.startHour
        }
      });
      let startMinutes = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.startMinutes
        }
      });
      let endDate = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.endDate
        }
      });
      let endHour = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.endHour
        }
      });
      let endMinutes = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.endMinutes
        }
      });
      let meetingLocation = this.props.meetings.map((val)=>{
        if( val.id == this.props.MeetingId){
          return val.meetingLocation
        }
      });
      return (
          <View style={styles.container}>
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
            <Text>Start Time- End Time</Text>
            <Text>Date : {startDate} {startHour}:{startMinutes} - Date : {endDate} {endHour}:{endMinutes}</Text>
            <Text>Location</Text>
            <Text>{meetingLocation}</Text>
          </View>
      );
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
});
