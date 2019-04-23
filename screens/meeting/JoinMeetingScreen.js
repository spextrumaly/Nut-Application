import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Image,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux'
import { fetchAllMeeting, joinMeeting } from '../../src/fetchData';
import AwesomeButton from "react-native-really-awesome-button";

class JoinMeetingScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handlePressInContinue = this.handlePressInContinue.bind(this);
    this.handlePressOutContinue = this.handlePressOutContinue.bind(this);
    this.state = {
      idMeeting:this.props.idMeetingShare,
    }
  }

  componentWillMount() {
    this.animatedValueContinue = new Animated.Value(1);
  }
  handlePressInContinue() {
    Animated.spring(this.animatedValueContinue, {
      toValue: .75
    }).start()
  }
  handlePressOutContinue(navigate) {
    Animated.spring(this.animatedValueContinue, {
      toValue: 1,
    }).start(() => {
      this.props.addProject(this.state.idMeeting, navigate, this.props.meetingsPlan)
    })
  }
  render() {
    const {navigate} = this.props.navigation;
    const animatedStyleContinue = {
      transform: [{ scale: this.animatedValueContinue}]
    }
    console.log('idMeeting:',this.state.idMeeting)
    return (
      <ImageBackground source={require('../../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/enter-nutid.png')}/>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder={this.props.idMeetingShare ? this.props.idMeetingShare: "Enter Your NutID"}
              onChangeText={(idMeeting)=> this.setState({idMeeting})}
              value={this.state.idMeeting}
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'/>
          </View>
          <AwesomeButton
                style={{opacity: 0.8}}
                backgroundDarker='#4A3C39'
                backgroundColor='#7B6B68'
                width={250}
                borderRadius={30}
                onPress={() => this.handlePressOutContinue(navigate)}
              >
                <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Join Meeting</Text>
              </AwesomeButton>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
      allMeetings: state.allMeetings,
      idMeetingShare: state.idMeetingShare,
      meetingsPlan: state.meetingsPlan
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (id, navigate, meetings) => {
      joinMeeting(id)
      dispatch({ type: 'FETCH_CLEAR_ALL_MEETING' })
      // fetchAllMeeting((meetings) => {
      //   dispatch({ type: 'FETCH_ALL_MEETING', payload: meetings
      //   })
      // })
      navigate('Meetings');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinMeetingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    marginLeft:5,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  },
  textInput: {
    fontFamily: 'Kanit-Regular',
    marginLeft:10,
  },
  topicContainer: {
    width: '100%',
    height: 100,
  },
});