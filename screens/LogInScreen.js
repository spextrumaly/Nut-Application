import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import * as firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";
import { firebaseConfig } from './../src/firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  static navigationOptions = { header: null }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.displayName + ' login Screen');
        this.props.navigation.navigate('App');

      }
    })
  }
  _loginWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:"254466724620-fub07e0bs573lmhs9b1v010n3kf7saoe.apps.googleusercontent.com",
        iosClientId:"254466724620-rgm8nc62espnjrf3kvtj9om9nesu9nih.apps.googleusercontent.com",
        webClientId:"254466724620-nrevos06qg3fnsoh4ps873kte5rujqmk.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
  
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
       .auth()
       .signInAndRetrieveDataWithCredential(credential)
       .then( res => {
         if (res.additionalUserInfo.isNewUser) {
           console.log('new users');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .set({
              name: res.user.displayName,
              mail: res.user.email,
              last_logged_in: Date.now(),
            });
         } else {
           console.log('old user');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .update({
              last_logged_in: Date.now()
            });
         }
         AsyncStorage.setItem('userToken', idToken);
         this.props.navigation.navigate('App');
       })
       .catch( error => {
        console.log("firebase cred err:", error);
       })
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  _loginWithFacebook = async () => {
    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('653081438441571', { permissions: ['email', 'public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase
       .auth()
       .signInAndRetrieveDataWithCredential(credential)
       .then( res => {
         if (res.additionalUserInfo.isNewUser) {
           console.log('new users');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .set({
              name: res.user.displayName,
              mail: res.user.email,
              last_logged_in: Date.now(),
            });
         } else {
           console.log('old user');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .update({
              last_logged_in: Date.now()
            });
         }
         AsyncStorage.setItem('userToken', idToken);
         this.props.navigation.navigate('App');
       })
       .catch( error => {
        console.log("firebase cred err:", error);
       })
    }
  };

  render() {
    return (
        <Container style={styles.container}>
        <Image source={require('../assets/images/bg.png')} style={styles.backgroundImage}></Image>
        <View style={styles.loginForm}>
          <Image source={require('../assets/images/text-nut.png')} style={styles.nutImg}></Image>
          <AwesomeButton
            backgroundDarker='#29487d'
            backgroundColor='#3b5998'
            stretch={true}
            onPress={this._loginWithFacebook}
          >
            <Text style={{ color: 'white', fontFamily: 'Kanit-Regular' }}> Login With Facebook</Text>
          </AwesomeButton>
          <AwesomeButton style={{ marginTop: 10}}
            stretch={true}
            backgroundDarker='#900c3f'
            backgroundColor='#c70039'
            onPress={this._loginWithGoogle}
          >
            <Text style={{ color: 'white', fontFamily: 'Kanit-Regular' }}> Login With Google</Text>
          </AwesomeButton>
        </View>
        </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A3C39',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  nutImg: {
    marginLeft: 'auto',
    marginTop: -300,
    width: '80%',
    marginBottom: -250,
    marginRight: 'auto',
    resizeMode: 'contain'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain' // or 'stretch'
  },
  loginForm: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20
  },
});