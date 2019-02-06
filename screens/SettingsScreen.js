import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';

export default class SettingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
    
  render() {
    const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <View key={this.props.keyval} style={styles.task}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <View>
              <Text style={styles.taskText}>Setting</Text>
            </View>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.logoutContainer}>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                  onPress={this._signOutAsync}
                >
                <Text style={styles.signUpText}>Logout</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
    );
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
    borderRadius:30,
    margin: 10,
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
    color: '#4A3C39'
  },
});
