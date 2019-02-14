import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import { store } from '../Store/Store';
import moment from "moment";

export default class SignUpView extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      taskText: '',
      taskOwner: '',
    };
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Task Name :'
              onChangeText={(taskText)=> this.setState({taskText})}
              value={this.state.taskText}
              placeholderTextColor='black'
              underlineColorAndroid='transparent'/>
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Task Owner :'
              onChangeText={(taskOwner)=> this.setState({taskOwner})}
              value={this.state.taskOwner}
              placeholderTextColor='black'
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}  onPress={ () => this.addTask(goBack)}>
            <Text style={styles.signUpText}>Add Task</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  addTask(goBack){
    var timestamp = moment().format();
    if(this.state.taskText || this.setState.taskOwner){
        var d = new Date();
        store.taskArray.push({
          'ProjectName': store.ProjectName,
          'createDate': timestamp,
          'task': this.state.taskText,
          'owner': this.state.taskOwner,
        });
        store.newFeedArray.push({
          'ProjectName': store.projectState.name,
          'task': this.state.taskText,
          'createDate': timestamp,
          'status': 'createTask',
        });
        this.setState({taskText:''});
        this.setState({taskOwner:''});
        goBack();
    }
  }
}

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
    marginLeft:10,
  }
});
