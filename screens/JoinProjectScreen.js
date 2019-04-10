import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import { store } from '../Store/Store';

export default class JoinProjectScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      idProject: '',
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
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
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}  onPress={ () => this.addProject(navigate)}>
            <Text style={styles.signUpText}>Join Project</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  addProject(navigate){
    store.projectArray.map((val)=>{
      if( this.state.idProject == val.id) {
        val.status = 'join';
        navigate('Home');
      }
    });
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