import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ImageBackground
} from 'react-native';
import { store } from '../Store/Store';

export default class SignUpView extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskDetails: '',
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Task Name :'
              onChangeText={(taskName)=> this.setState({taskName})}
              value={this.state.taskName}
              placeholderTextColor='black'
              underlineColorAndroid='transparent'/>
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <TextInput style={styles.inputs}
              style={styles.textInput}
              placeholder='Task description :'
              onChangeText={(taskDetails)=> this.setState({taskDetails})}
              value={this.state.taskDetails}
              placeholderTextColor='black'
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}  onPress={ () => this.continue(navigate)}>
            <Text style={styles.signUpText}>Continue</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
    continue(navigate){
      if(this.state.taskName){
        store.taskState.name = this.state.taskName;
        store.taskState.details = this.state.taskDetails;
        navigate('CalendarTask')
      }
    }

  // addTask(goBack){
  //   var timestamp = moment().format();
  //   var text = "";
  //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (var i = 0; i < 5; i++)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   if(this.state.taskName || this.setState.taskDetails){
  //       var d = new Date();
  //       store.taskArray.push({
  //         'ProjectName': store.ProjectName,
  //         'ProjectID': store.ProjectId,
  //         'createDate': timestamp,
  //         'task': this.state.taskName,
  //         'id': text,
  //         'owner': this.state.taskDetails,
  //         'status': 'active',
  //       });
  //       store.newFeedArray.push({
  //         'ProjectName': store.ProjectName,
  //         'ProjectID': store.ProjectID,
  //         'task': this.state.taskName,
  //         'createDate': timestamp,
  //         'id': text,
  //         'status': 'createTask',
  //       });
  //       this.setState({taskName:''});
  //       this.setState({taskDetails:''});
  //       goBack();
  //   }
  // }
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
