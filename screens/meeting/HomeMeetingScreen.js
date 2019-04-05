import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { store } from '../../Store/Store'

export default class MeetingScreen extends React.Component { 
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
      store.meetingArray.map((val)=>{
        if( val.id == store.MeetingId)
          this.setState({meeting: val})
      });
      return (
          <View style={styles.container}>
            <View style={styles.task}>
              <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')}/>
              <View>
                <Text style={styles.taskText}>{this.state.meeting.meetingName}</Text>
                <Text style={styles.taskSubText}>id : { this.state.meeting.id }</Text>
                <TouchableOpacity onPress={() => this.deleteMeeting(navigate)} style={styles.projectDelete}>
                  <Text style={styles.projectDeleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      );
  }
  deleteMeeting(navigate) {
    store.meetingArray.map((val, key)=>{
      if( val.id == store.MeetingId)
        store.meetingArray.splice(key, 1);
    });
    navigate('Links')
  }
}

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
    color: '#4A3C39'
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
