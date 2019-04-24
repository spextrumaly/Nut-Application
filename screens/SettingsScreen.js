import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS,
  Linking,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';

export default class SettingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    
  render() {
    var user = firebase.auth().currentUser
    return (
      <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
        
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>{user.displayName}</Text>
            <Text style={styles.subNameText}>{user.email}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.groupButton}>
          <View style={styles.project}>
            <TouchableOpacity onPress = { () => this._reset()}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/profile.png')}/>
                <View>
                  <Text style={styles.nameText}>Reset Profile</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.project}>
            <TouchableOpacity onPress={() => this._signOutAsync()}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/logout.png')}/>
                <View>
                  <Text style={styles.nameText}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.groupButton}>
          <View style={styles.project}>
            <TouchableOpacity onPress = { () => this._aboutus()}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/aboutUs.png')}/>
                <View>
                  <Text style={styles.nameText}>About us</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.project}>
            <TouchableOpacity onPress = { () => this._terms()}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/privacy.png')}/>
                <View>
                  <Text style={styles.nameText}>Terms & Privacy</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.project}>
            <TouchableOpacity onPress = { () => this._donate()}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/donate.png')}/>
                <View>
                  <Text style={styles.nameText}>Donate & Support</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.groupButton}>
          <View style={styles.project}>
            <TouchableOpacity onPress={this.props.detailTaskMethod}>
              <View style={styles.headCard}>
              <Image style={styles.otherIcon} source={require('../assets/images/reminder.png')}/>
                <View>
                  <Text style={styles.nameText}>Share this app</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.groupButton}>
          <View>
            <Text style={styles.thankyou}>Thank you for using our application :&#41;</Text>
        </View>
        </View>
        </ScrollView>
      </View>
    );
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('Auth');
    } catch (e){
      console.log(e)
    } 
  };

  _donate = () => {
    this.props.navigation.navigate('DonateScreen');
  }
  _aboutus = () => {
    this.props.navigation.navigate('AboutUsScreen');
  }
  _terms = () => {
    this.props.navigation.navigate('TermsConditionScreen');
  }
  _reset = async () => {
    var user = await firebase.auth().currentUser
    console.log('test', user.displayName)
    var projectRef = await firebase.database().ref('user/' + user.uid + '/project/')
    var meetingRef = await firebase.database().ref('user/' + user.uid + '/meeting/')
    var meetingPlanRef = await firebase.database().ref('user/' + user.uid + '/meetingPlan/')
    projectRef.remove()
    meetingRef.remove()
    meetingPlanRef.remove()
    var query = firebase.database().ref("task").orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key; // "ada"
          testRef = firebase.database().ref('task/' + key + '/ownerName').once('value').then(function(snapshot) {
            var owner = snapshot.val()
            if(owner === user.displayName){
              firebase.database().ref('task/' + key).remove()
            }
          })
          // Cancel enumeration
      });
    });
    AlertIOS.alert('Reset', 'Reset Completed!')
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f2'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 100
  },
  containerSetting: {
    flexDirection: 'row'
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
    fontFamily: 'Kanit-Medium'
  },
  task: {
    position: 'relative',
    padding: 15,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#4A3C39",
    
  },
  inputIcon:{
    width:60,
    height:60,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    color: '#f5f5dc'
  },
  subNameText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Kanit-Italic',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#f5f5dc',
    opacity: 0.6

  },
  settingIcon:{
    width:40,
    height:40,
    margin:15,
    marginLeft: 30,
    justifyContent: 'center'
  },
  textSetting: {
    fontSize: 18,
    padding: 15,
    color: '#4A3C39',
    paddingTop: 20,
    fontFamily: 'Kanit-Regular'
  },
  containerTopicSetting: {
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor: '#4A3C39',
  },
  containerIconTopicSetting: {
    borderBottomWidth:1,
    borderBottomColor: '#4A3C39',
  },
  project: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    borderBottomWidth:1,
    borderBottomColor: '#ffffff',
    borderTopWidth:1,
    borderTopColor: '#ffffff',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    opacity: 0.75,
  },
    headCard: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    otherIcon:{
      width:20,
      height:20,
      marginLeft: 10,
      marginTop: 3,
    },
    bodyDeadline: {
      position: 'absolute',
      zIndex: 11,
      right: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameText: {
      paddingLeft: 30,
      fontSize: 17,
      fontFamily: 'Kanit-Regular'
    },
    projectOwnerText: {
      paddingLeft: 10,
      fontSize: 10,
      fontFamily: 'Kanit-Italic'
    },
    projectText: {
      fontSize: 10,
      color: '#696969',
      fontFamily: 'Kanit-Regular'
    },
    thankyou: {
      textAlign: 'center',
      fontSize: 18,
      color: '#696969',
      opacity: 0.5,
      fontFamily: 'Kanit-Italic'
    },
    projectDelete: {
        backgroundColor: '#4A3C39',
        padding: 10,
        width: 70,
        marginLeft: 20,
        borderRadius:15,
      },
    projectDetail: {
      backgroundColor: '#4A3C39',
      padding: 10,
      width: 70,
      marginLeft: 10,
      borderRadius:15,
  },
    projectDeleteText: {
        color: 'white'
    },
    groupButton: {
      marginTop: 30,
    }
});
