import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

class SelectProjectCreate extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handlePressInCreateMeeting = this.handlePressInCreateMeeting.bind(this);
    this.handlePressOutCreateMeeting = this.handlePressOutCreateMeeting.bind(this);
    this.handlePressInCreateTask = this.handlePressInCreateTask.bind(this);
    this.handlePressOutCreateTask = this.handlePressOutCreateTask.bind(this);
    this.state = {
      taskName: '',
      taskDetails: '',
    };
  }
  componentWillMount() {
    this.animatedValueContinue = new Animated.Value(1);
  }
  handlePressInCreateMeeting() {
    Animated.spring(this.animatedValueContinue, {
      toValue: .75
    }).start()
  }
  handlePressOutCreateMeeting(navigate) {
    Animated.spring(this.animatedValueContinue, {
      toValue: 1,
    }).start(() => {
      this.props.ContinueMeeting(this.props.meetingOnProjectId, this.props.ProjectId, navigate)
    })
  }
  handlePressInCreateTask() {
    Animated.spring(this.animatedValueContinue, {
      toValue: .75
    }).start()
  }
  handlePressOutCreateTask(navigate) {
    Animated.spring(this.animatedValueContinue, {
      toValue: 1,
    }).start(() => {
      this.props.ContinueTask(navigate)
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    const animatedStyleContinue = {
      transform: [{ scale: this.animatedValueContinue}]
    }
    return (
      <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPressIn={() => this.handlePressInCreateMeeting}
            onPressOut={() => this.handlePressOutCreateMeeting(navigate)}
          >
            <Animated.View style={[styles.buttonContainer, styles.signupButton, animatedStyleContinue]}>
              <Text style={styles.signUpText}>Create Project Meeting</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => this.handlePressInCreateTask}
            onPressOut={() => this.handlePressOutCreateTask(navigate)}
          >
            <Animated.View style={[styles.buttonContainer, styles.signupButton, animatedStyleContinue]}>
              <Text style={styles.signUpText}>Create Project Task</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    meetingOnProjectId: state.meetingOnProjectId,
    ProjectId: state.ProjectId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ContinueTask: (navigate) => {
      navigate('CreateTask')
    },
    ContinueMeeting: (meetingOnProjectId, ProjectId, navigate) => {
      dispatch({ type: 'CREATE_MEETING_ON_PROJECT',  
        id: ProjectId
      })
      navigate('CreateMeeting')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectProjectCreate)

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
    marginLeft:10,
    fontFamily: 'Kanit-Regular'
  }
});
