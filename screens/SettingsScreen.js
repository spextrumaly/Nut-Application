import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';

export default class SettingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    
  render() {
    return (
      <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>Setting</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <TouchableHighlight>
            <View style={styles.containerSetting}>
              <Image style={styles.settingIcon} source={require('../assets/images/profile.png')}/>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>Edit Profile</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.containerSetting}>
              <Image style={styles.settingIcon} source={require('../assets/images/reminder.png')}/>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>Reminder</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.containerSetting}>
              <Image style={styles.settingIcon} source={require('../assets/images/aboutUs.png')}/>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>About Us</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.containerSetting}>
              <Image style={styles.settingIcon} source={require('../assets/images/privacy.png')}/>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>Terms & Privacy</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => Linking.openURL('https://donorbox.org/nut-application-donate')}>
            <View style={styles.containerSetting}>
              <Image style={styles.settingIcon} source={require('../assets/images/donate.png')}/>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>Donate & Support</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._signOutAsync}>
            <View style={styles.containerSetting}>
              <View style={styles.containerIconTopicSetting}>
                <Image style={styles.settingIcon} source={require('../assets/images/logout.png')}/>
              </View>
              <View style={styles.containerTopicSetting}>
                <Text style={styles.textSetting}>Logout</Text>
              </View>
            </View>
          </TouchableHighlight>          
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
    fontFamily: 'Kanit-Regular'
  },
  task: {
    position: 'relative',
    padding: 15,
    paddingTop: 40,    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4A3C39",
  },
  inputIcon:{
    width:30,
    height:30,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: 'Kanit-Bold',
    paddingBottom: 10,
    color: '#f5f5dc'
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
  }
});
