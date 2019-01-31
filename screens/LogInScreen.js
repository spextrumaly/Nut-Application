import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, } from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
  apiKey: "AIzaSyCJysqR5oPg65e6WYeUWYqKihxh3Hdcyxs",
  authDomain: "nut-project-32750.firebaseapp.com",
  databaseURL: "https://nut-project-32750.firebaseio.com",
  projectId: "nut-project-32750",
  storageBucket: "nut-project-32750.appspot.com",
  messagingSenderId: "748289478478"
};

firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  _signInFBAsync = async () => {
    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('653081438441571', { permissions: ['email', 'public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error)
      })
      await AsyncStorage.setItem('userToken', 'facebook');
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <Container style={styles.container}>
          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={this._signInFBAsync}
          >
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>
          <Button style={{ marginTop: 10, backgroundColor: 'white' }}
            full
            rounded
            onPress={this._signInFBAsync}
          >
            <Text style={{ color: 'black' }}> Login With Google</Text>
          </Button>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});