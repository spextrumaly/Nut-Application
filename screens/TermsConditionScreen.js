import React from 'react';
import * as Animatable from 'react-native-animatable';
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Button,
  Linking,
  WebView,
  Image
} from 'react-native';
import Project from '../components/Project';
import { connect } from 'react-redux'

class HomeProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
        showSelect: false,
        showCreate: false,
        showJoin: false,
        anim: false
    };
  }
  componentWillMount() {
    this.animatedValueAdd = new Animated.Value(0);
  }
  render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>Terms & Privacy</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.topicTerms}>Privacy Policy</Text>
          <Text style={styles.textTerms}>SKE13 STRN built the Nut application app as an Open Source app. This SERVICE is provided by SKE13 STRN at no cost and is intended for use as is.

This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.

If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Nut application unless otherwise defined in this Privacy Policy.</Text>
        <Text style={styles.subTopicTerms}>Information Collection and Use</Text>
        <Text style={styles.textTerms}>For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.

The app does use third party services that may collect information used to identify you.</Text>
        <Text style={styles.subTopicTerms}>Cookies</Text>
        <Text style={styles.textTerms}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</Text>
        <Text style={styles.subTopicTerms}>Security</Text>
        <Text style={styles.textTerms}>I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.</Text>
        <Text style={styles.subTopicTerms}>Contact Us</Text>
        <Text style={styles.textTerms}>If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at Kasetsart University Bangkhen, BKK.</Text>
        </ScrollView>
      </View>
      );
  }

  addproject(){
    if(this.state.showSelect == true) {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start(() => {
        this.setState({anim: false});
        setTimeout(() => this.setState({
          showSelect: false
      }), 500)
      })
    } else {
      Animated.timing(this.animatedValueAdd, {
        toValue: 1,
        duration: 200
      }).start(() => {
        this.setState({showSelect: true});
        this.setState({anim: true});
      })
    }
  }
}

function mapStateToProps(state) {
  return {
      projects: state.projects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detailMethod: (navigate, val) => {
      dispatch({ type: 'DETAIL_PROJECT',  
        id: val.id
      })
      navigate('Project')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProjectScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    // marginBottom: 100
  },
  body: {
    backgroundColor: '#f5f3f2',
    flex: 1,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 10,
      backgroundColor: '#252525',
      borderTopColor: '#ededed',
      fontFamily: 'Kanit-Regular'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 20,
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 40,
      fontFamily: 'Kanit-Regular'
  },
  buttonAdd: {
    position: 'absolute',
    zIndex: 11,
    bottom: 60,
    width: 150,
    right: 17,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thankyou: {
    textAlign: 'center',
    fontSize: 18,
    color: '#696969',
    opacity: 0.6,
    fontFamily: 'Kanit-Medium'
  },
  subTY: {
    textAlign: 'center',
    fontSize: 13,
    color: '#696969',
    opacity: 0.5,
    fontFamily: 'Kanit-Light'
  },
  createBtnAnimate: {
    position: 'absolute',
    zIndex: 11,
    bottom: 100,
    right: -60,
  },
  joinBtnAnimate: {
    position: 'absolute',
    zIndex: 11,
    bottom: 25,
    right: -60,

  },
  buttonAddStyle: {
    marginBottom: 10,
    backgroundColor: '#4A3C39',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    marginLeft:5,
    borderRadius:30,
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
    paddingTop: 40,    
    flexDirection: 'row',
    zIndex: 20,
    alignItems: 'center',
    backgroundColor: "#4A3C39",
  },
  inputIcon:{
    width:30,
    height:30,
    margin:5,
    justifyContent: 'center'
  },
  projectContainer: {
    fontFamily: 'Kanit-Regular'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Kanit-Bold',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#f5f5dc'
  },
  groupButton: {
    marginTop: 25,
  },
  nameText: {
    paddingLeft: 5,
    fontSize: 17,
    fontFamily: 'Kanit-Regular',
    color: '#4A3C39'
  },
  topicTerms: {
    paddingLeft: 15,
    fontSize: 30,
    fontFamily: 'Kanit-Medium',
    color: '#4A3C39',
    marginTop: 20,
    marginBottom: 20
  },
  subTopicTerms: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
    color: '#4A3C39',
    marginTop: 10,
    marginBottom: 10
  },
  textTerms: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
    color: '#4A3C39',
    marginTop: 10,
    marginBottom: 10
  }

});

