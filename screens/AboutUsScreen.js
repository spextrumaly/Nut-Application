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
            <Text style={styles.taskText}>About Us</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.groupButton}>
            <Text style={{fontFamily: 'Kanit-Regular', fontSize: 25, paddingLeft: 15, color: '#4A3C39'}}>Thank you for using</Text>
            <Text style={{fontFamily: 'Kanit-Medium', fontSize: 25, paddingLeft: 15, color: '#4A3C39'}}>Nut Application.</Text>
            <Text style={{fontFamily: 'Kanit-Regular', fontSize: 13, opacity: 0.6, paddingLeft: 15, color: '#4A3C39'}}>Version 0.5 (beta)</Text>
          </View>
          <View style={styles.groupButton}>
            <Text style={{fontFamily: 'Kanit-Medium', fontSize: 14, opacity: 0.7, paddingLeft: 15, marginBottom: 5}}>CONTACT</Text>
            <View style={styles.project}>
            <TouchableOpacity onPress = { () => Linking.openURL('https://github.com/spextrumaly/Nut-Application')}>
              <View style={styles.headCard}> 
                <Text style={styles.nameText}>Visit Github.com</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.project}>
            <TouchableOpacity onPress = { () => Linking.openURL('https://www.instagram.com/explore/tags/nutapplication/')}>
              <View style={styles.headCard}> 
                <Text style={styles.nameText}>Follow us on #nutapplication</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupButton}>
            <Text style={styles.thankyou}>Nut Application, Thailand</Text>
            <Text style={styles.subTY}>Chatuchak, Kasetsart University</Text>
            <Text style={styles.subTY}>10900 Bangkok</Text>
          </View>
        </View>
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
  project: {
    padding: 13,
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

});

