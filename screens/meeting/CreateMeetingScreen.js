import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import { store } from '../../Store/Store';
import { connect } from 'react-redux';

class CreateMeeting extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handlePressInContinue = this.handlePressInContinue.bind(this);
    this.handlePressOutContinue = this.handlePressOutContinue.bind(this);
    this.state = {
      nameMeeting: '',
      detailMeeting: '',
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
      this.props.Continue(this.state.nameMeeting, this.state.detailMeeting, navigate)
    })
  }
  render() {
    const {navigate} = this.props.navigation;
    const animatedStyleContinue = {
      transform: [{ scale: this.animatedValueContinue}]
    }
    return (
      <ImageBackground source={require('../../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        {/* <Text style={styles.textStep}>
          STEP 1/2
        </Text> */}
        <View style={styles.container}>
          {/* <Text style={styles.textHeader}>
            What is your project ?
          </Text> */}
          <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../../assets/images/topic.png')}/>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Enter a meeting name...'
              onChangeText={(nameMeeting)=> this.setState({nameMeeting})}
              value={this.state.nameMeeting}
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'/>
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Enter a description...'
              onChangeText={(detailMeeting)=> this.setState({detailMeeting})}
              value={this.state.detailMeeting}
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableWithoutFeedback
            onPressIn={this.handlePressInContinue}
            onPressOut={() => this.handlePressOutContinue(navigate)}
          >
            <Animated.View style={[styles.buttonContainer, styles.signupButton, animatedStyleContinue]}>
              <Text style={styles.signUpText}>Continue</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }

  // continue(navigate){
  //   if(this.state.nameMeeting){
  //     store.meetingState.name = this.state.nameMeeting;
  //     store.meetingState.details = this.state.detailMeeting;
  //     navigate('CalendarMeeting')
  //   }
  // }
}

function mapDispatchToProps(dispatch) {
  return {
    Continue: (name, detail, navigate) => {
      dispatch({ type: 'ADD_MEETING_STATE',
        name: name, detail : detail
      })
      navigate('CalendarMeeting')
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateMeeting)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStep: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#f5f5dc',
    textAlign: 'center',
  },
  topicContainer: {
    width: '100%',
    height: 100,
  },
  textHeader: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#f5f5dc',
    marginBottom:20,
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
    marginLeft:10,
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
    fontFamily: 'Kanit-Regular'
  },
  textInput: {
    fontFamily: 'Kanit-Regular',
    marginLeft:10,
  }
});