import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ImageBackground, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";
import { firebaseConfig } from './../src/firebaseConfig';
import { connect } from 'react-redux';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import { fetchAllProject, fetchAllMeeting, fetchAllData, fetchAllTaskFirst, fetchAllMeetingPlan, fetchAllTaskNewFeed } from '../src/fetchData';


class App extends React.Component {

  constructor(props) {
    super(props)
  }
  static navigationOptions = { header: null }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.displayName + ' login Screen');
        this.props.fetchDispatchAllData()
        this.props.fetchDispatchAllProject()
        this.props.fetchDispatchAllMeeting()
        this.props.fetchDispatchAllMeetingPlan()
        this.props.fetchDispatchAllTask()
        this.props.fetchDispatchAllTaskFirst()
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
              timestamp: Date.now()
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
       console.log("LOGIN")
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
              timestamp: Date.now()
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
      console.log("LOGIN")
    }
  };

  render() {
    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
          <View style={styles.loginForm}>
            <Image source={require('../assets/images/text-nut.png')} style={styles.nutImg}></Image>
            <View style={styles.buttonContainer}>
              <AwesomeButton
                backgroundDarker='#29487d'
                backgroundColor='#3b5998'
                stretch={true}
                onPress={this._loginWithFacebook}
              >
                <Text style={{ color: 'white', fontFamily: 'Kanit-Regular' }}> Login With Facebook</Text>
              </AwesomeButton>
              {/* <AwesomeButton style={{ marginTop: 10}}
                stretch={true}
                backgroundDarker='#900c3f'
                backgroundColor='#c70039'
                onPress={this._loginWithGoogle}
              >
                <Text style={{ color: 'white', fontFamily: 'Kanit-Regular' }}> Login With Google</Text>
              </AwesomeButton> */}
            </View>
          </View>
        </ImageBackground>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDispatchAllData: () => {
      fetchAllData((user) => {
        dispatch({ type: 'FETCH_USER_DATA', payload: user
      })
    })
    },
    fetchDispatchAllProject: () => {
      fetchAllProject((projects) => {
          dispatch({ type: 'FETCH_ALL_PROJECT', payload: projects
        })
      },() => dispatch({ type: 'FETCH_CLEAR_ALL_PROJECT' }))
    },
    fetchDispatchAllMeeting: () => {
      fetchAllMeeting((meetings) => {
        dispatch({ type: 'FETCH_ALL_MEETING', payload: meetings })
      }, () => dispatch({ type: 'FETCH_CLEAR_ALL_MEETING' })
    )
    },
    fetchDispatchAllMeetingPlan: () => {
      fetchAllMeetingPlan((meetings) => {
        dispatch({ type: 'FETCH_ALL_MEETING_PLAN', payload: meetings })
      }, () => dispatch({ type: 'FETCH_CLEAR_ALL_MEETING_PLAN' }))
    },
    fetchDispatchAllTask: () => {
      fetchAllTaskNewFeed((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK_NEW_FEED', payload: tasks })
      }, () => dispatch({ type: 'FETCH_CLEAR_ALL_TASK_FEED' }))
    },
    fetchDispatchAllTaskFirst: () => {
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTaskFirst((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK_FIRST', payload: tasks })
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  scrollContainer: {
    maxWidth: '100%',
  },
  nutImg: {
    width: '80%',
    resizeMode: 'contain',
    // marginTop: -400,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    position: 'absolute',
    top: -300,
    left: 50
  },
  buttonContainer: {
    marginTop: 450
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  loginForm: {
    padding: 20,
    position: 'relative'
    
  },
});