import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, } from 'react-native';

import * as firebase from 'firebase';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {

  constructor(props) {
    super(props)

  }

  

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        //console.log(user);
      }
    })
  }

  _loginWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:"254466724620-fub07e0bs573lmhs9b1v010n3kf7saoe.apps.googleusercontent.com",
        iosClientId:"254466724620-rgm8nc62espnjrf3kvtj9om9nesu9nih.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
  
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            // user res, create your user, do whatever you want
            console.log(res.profile.email);
          })
          .catch(error => {
            console.log("firebase cred err:", error);
          });
          await AsyncStorage.setItem('userToken', 'google');
          this.props.navigation.navigate('App');
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  isFacebookUserEqual = (facebookAuthResponse, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
            providerData[i].uid === facebookAuthResponse.userID) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

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
           console.log(res);
           firebase
            .database()
            .ref('/users/' + res.user.uid)
            .set({
              name: res.user.displayName,
              mail: res.user.email,
              last_logged_in: Date.now(),
            });
         } else {
           console.log('old user');
           firebase
            .database()
            .ref('/users/' + res.user.uid)
            .update({
              last_logged_in: Date.now()
            });

         }
       })
       .catch((error) => {
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
            onPress={this._loginWithFacebook}
          >
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>
          <Button style={{ marginTop: 10, backgroundColor: 'white' }}
            full
            rounded
            onPress={this._loginWithGoogle}
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