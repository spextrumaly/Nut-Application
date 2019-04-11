import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  
  TouchableWithoutFeedback,
  Animated,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Meeting from '../components/Meeting';
import { store } from '../Store/Store';
import { connect } from 'react-redux'

const showAnimation = "slideInUp"
const hideAnimation = "slideOutDown"
class MeetingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.handlePressInCreate = this.handlePressInCreate.bind(this);
    this.handlePressOutCreate = this.handlePressOutCreate.bind(this);
    this.handlePressInJoin = this.handlePressInJoin.bind(this);
    this.handlePressOutJoin = this.handlePressOutJoin.bind(this);
    this.state = {
      showSelect: false,
      showCreate: false,
      showJoin: false,
      anim: false
    };
  }
  componentWillMount() {
    this.animatedValueCreate = new Animated.Value(1);
    this.animatedValueJoin = new Animated.Value(1);
    this.animatedValueAdd = new Animated.Value(0);
  }
  handlePressInCreate() {
    Animated.spring(this.animatedValueCreate, {
      toValue: .1
    }).start()
  }
  handlePressOutCreate(navigate) {
    Animated.spring(this.animatedValueCreate, {
      toValue: 1,
    }).start(() => {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start()
      this.createMeeting(navigate)
    })
  }
  handlePressInJoin() {
    Animated.spring(this.animatedValueJoin, {
      toValue: .1
    }).start()
  }
  handlePressOutJoin(navigate) {
    Animated.spring(this.animatedValueJoin, {
      toValue: 1,
    }).start(() => {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start()
      this.joinMeeting(navigate)
    })
  }
  render() {
    console.log("MEETING :", this.props.meetings)
    const {navigate} = this.props.navigation;
    const interpolateRotation = this.animatedValueAdd.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '135deg'],
    })
    const animatedStyleAdd = {
      transform: [
        { rotate: interpolateRotation }
      ]
    }
    const animatedStyleCreate = {
      transform: [{ scale: this.animatedValueCreate}]
    }
    const animatedStyleJoin = {
      transform: [{ scale: this.animatedValueJoin}]
    }
    let meetings = this.props.meetings.map((val, key)=>{
        return <Meeting key={key} keyval={key} val={val}
                detailMethod={() => this.props.detailMethod(val, navigate)}
              />
    });
    return (
      <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>Meetings</Text>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.scrollContainer}>
          <View style={styles.projectContainer}>
            {meetings}
          </View>
          </ScrollView>
          {this.state.showSelect == true ? 
            <View style={styles.buttonAdd}>
                <TouchableWithoutFeedback
                  onPressIn={this.handlePressInCreate}
                  onPressOut={() => this.handlePressOutCreate(navigate)}
                >
                  <Animated.View style={[animatedStyleCreate]}>
                    <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} style={[styles.createBtnAnimate]}>
                      <Text style={styles.signUpText}>Create Meeting</Text>
                    </Animatable.View>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPressIn={this.handlePressInJoin}
                  onPressOut={() => this.handlePressOutJoin(navigate)}
                >
                  <Animated.View style={[animatedStyleJoin]}>
                    <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} style={[styles.joinBtnAnimate]}>
                      <Text style={styles.signUpText}>Join Meeting</Text>
                    </Animatable.View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
              : null }
              <View style={styles.footerFlex}>
                <TouchableOpacity onPress={ this.addMeeting.bind(this) } style={styles.addButton}>
                  <Animated.View style={animatedStyleAdd}>
                    <Text style={styles.addButtonText}>+</Text>
                  </Animated.View>
                </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  addMeeting(){
    if(this.state.showSelect == true) {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start(() => {
        this.setState({anim: false});
        setTimeout(() => this.setState({
          showSelect: false
      }), 1000)
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
  createMeeting(navigate){
    this.setState({showSelect: false});
    navigate('CreateMeeting')
  }
  joinMeeting(navigate){
    this.setState({showSelect: false});
    navigate('JoinMeeting')
  }
  detailMethod(navigate, val){
    store.MeetingId = val.id;
    navigate('Meeting')
  }
}

function mapStateToProps(state) {
  return {
    meetings: state.meetings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detailMethod: (val, navigate) => {
      dispatch({ type: 'DETAIL_MEETING',
        id: val.id
    })
      navigate('Meeting')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100
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
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 90,
      backgroundColor: '#E91E63',
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24
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
  body: {
    backgroundColor: '#DCDCDC',
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
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 20,
      backgroundColor: '#4A3C39',
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24
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
    fontFamily: 'Kanit-Bold',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#f5f5dc'
  },
  createBtnAnimate: {
    backgroundColor: "#4A3C39",
    position: 'absolute',
    zIndex: 11,
    bottom: 100,
    width: 150,
    right: -60,
    borderRadius:30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnAnimate: {
    backgroundColor: "#4A3C39",
    position: 'absolute',
    zIndex: 11,
    bottom: 25,
    width: 150,
    right: -60,
    borderRadius:30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
