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
  ImageBackground,
} from 'react-native';
import { store } from '../Store/Store';
import { connect } from 'react-redux'

class JoinProjectScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handlePressInContinue = this.handlePressInContinue.bind(this);
    this.handlePressOutContinue = this.handlePressOutContinue.bind(this);
    this.state = {
      idProject: '',
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
      this.props.addProject(this.props.allProjects, this.state.idProject, navigate)
    })
  }
  render() {
    const {navigate} = this.props.navigation;
    const animatedStyleContinue = {
      transform: [{ scale: this.animatedValueContinue}]
    }
    return (
      <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Enter your Nut ID...'
              onChangeText={(idProject)=> this.setState({idProject})}
              value={this.state.idProject}
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableWithoutFeedback
            onPressIn={this.handlePressInContinue}
            onPressOut={() => this.handlePressOutContinue(navigate)}
          >
            <Animated.View style={[styles.buttonContainer, styles.signupButton, animatedStyleContinue]}>
              <Text style={styles.signUpText}>Join Project</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
      allProjects: state.allProjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (values, id, navigate) => {
      values.map((val) => {
        if(val.id === id)
        dispatch({ type: 'JOIN_PROJECT',  
          project: val
        })
      })
      navigate('HomeProject');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinProjectScreen)

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
  },
  textInput: {
    fontFamily: 'Kanit-Regular',
    marginLeft:10,
  }
});