import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Meeting from '../components/Meeting';
import { store } from '../Store/Store';

export default class MeetingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      showSelect: false,
      showCreate: false,
      showJoin: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
        this.setState(() => {
            return { unseen: "does not display" }
        });
    }, 3000);
  }
    
  render() {
    const {navigate} = this.props.navigation;
    let meetings = store.meetingArray.map((val, key)=>{
        return <Meeting key={key} keyval={key} val={val}
                detailMethod={() => this.detailMethod(navigate, val)}
               />
    });
    return (
      <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>Meetings</Text>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.scrollContainer}>
          <View style={styles.projectContainer}>
            {meetings}
          </View>
          </ScrollView>
          {this.state.showSelect == true ? 
            <View style={styles.buttonAdd}>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                onPress={() => this.createMeeting(navigate)}
              >
              <Text style={styles.signUpText}>Create Meeting</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                onPress={() => this.joinMeeting(navigate)}
              >
              <Text style={styles.signUpText}>Join Meeting</Text>
              </TouchableHighlight>
            </View>
          : null }
          <View style={styles.footerFlex}>
            <TouchableOpacity onPress={ this.addMeeting.bind(this) } style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  addMeeting(){
    if(this.state.showSelect == true) {
      this.setState({showSelect: false});
    } else {
      this.setState({showSelect: true});
    }
  }
  createMeeting(navigate){
    this.setState({showSelect: false});
    navigate('CreateMeeting')
  }
  joinMeeting(navigate){
    this.setState({showSelect: false});
    navigate('JoinProject')
  }
  detailMethod(navigate, val){
    store.MeetingName = val.meetingName;
    store.MeetingId = val.id;
    navigate('Meeting')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 10,
      backgroundColor: '#252525',
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 90,
      backgroundColor: '#E91E63',
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
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#4A3C39'
  },
  body: {
    backgroundColor: '#DCDCDC',
    flex: 1,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 10,
      backgroundColor: '#252525',
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 20,
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
  buttonAdd: {
    position: 'absolute',
    zIndex: 11,
    bottom: 120,
    width: 150,
    right: 17,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddStyle: {
    marginBottom: 10,
    backgroundColor: '#4A3C39',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    marginLeft:5,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#4A3C39",
  },
  signUpText: {
    color: 'white',
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
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#4A3C39'
  },
});
