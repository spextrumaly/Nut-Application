import React from 'react';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import Project from '../components/Project'
import ActiveTask from '../components/ActiveTask'
import Meeting from '../components/MeetingNewFeed'
import { store } from '../Store/Store';
import { connect } from 'react-redux';
import moment from "moment";
import { fetchAllTask } from '../src/fetchData';
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'expo';


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    Linking.getInitialURL().then(url => {
      //const { path, queryParams } = Linking.parse(url);
      Linking.openURL(url);
      console.log('app.js url', url.spilt('/'));
      
    });
    let a = Linking.addEventListener("url", this._handleUrl);
    console.log('app.js a', a)
  }
  _handleUrl = url => {
    let { path, queryParams } = Linking.parse(url);
    let a = url.url
    if(a.split('?')[1]){
      if(a.split('?')[1].toString().split('&')[1].toString().split('=')[1] == 'meeting'){
        this.props.shareLineMeeting(a.split('?')[1].toString().split('&')[0].toString().split('=')[1], this.props.navigation.navigate)
      } else {
        this.props.shareLineProject(a.split('?')[1].toString().split('&')[0].toString().split('=')[1], this.props.navigation.navigate)      }
    }
  };

  render() {
      const {navigate} = this.props.navigation;
      let activetasksNewFeed = this.props.tasksNewFeed.map((val, key)=>{
        if(val.status == 'active' && !moment().isAfter(val.deadlineDate) && this.props.userDetail.name == val.ownerName) {
          return <ActiveTask key={key} keyval={key} val={val}
          deleteMethod={()=>this.deleteTask(key)}
          detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
          />
        }
      });
      let latetasksNewFeed = []
      latetasksNewFeed = this.props.tasksNewFeed.map((val, key)=>{
        if(moment().isAfter(val.deadlineDate)  && this.props.userDetail.name == val.ownerName && val.status == 'active') {
          return <ActiveTask key={key} keyval={key} val={val}
          deleteMethod={()=>this.deleteTask(key)}
          detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
          />
        }
      });
      let meetings = this.props.meetings.map((val, key)=>{
        return <Meeting key={key} keyval={key} val={val}
                detailMethod={() => this.props.detailMethodMeeting(val, navigate)}
              />
      });
      return (
        <ImageBackground source={require('../assets/images/bg.gif')}style={{width: '100%', height: '100%'}}>

          <View style={styles.container}>
            <View key={this.props.keyval} style={styles.task}>
              <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
              <View>
                <Text style={styles.taskText}>Feed</Text>
              </View>
            </View>
            <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
            </Animatable.View>
            <View style={styles.body}>
              <ScrollView style={styles.scrollContainer}>
              <View style={styles.projectContainer}>
                {
                  meetings && meetings.length ? 
                  <View style={styles.containerFeed}>
                    <View style={styles.containerTitle}>
                      <Text style={styles.titleFeed}>Active Meetings <FontAwesome name="circle" size={12} color="#2ab200" /></Text>
                    </View>
                    <View style={styles.meetings}>
                  <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%'}}>
                      {meetings}
                  </ImageBackground>
                    </View>
                  </View> : null
                }
                {
                  activetasksNewFeed.find(function(element) {
                    if(element !== undefined){
                      return true
                    }
                    ;
                  })  ? 
                  <View style={styles.containerFeed}>
                    <View style={styles.containerTitle}>
                      <Text style={styles.titleFeed}>Active Task <FontAwesome name="circle" size={12} color="#2ab200" /></Text>
                    </View>
                    <View style={styles.meetings}>
                    <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%'}}>
                      {activetasksNewFeed}
                    </ImageBackground>
                    </View>
                  </View> : null
                }
                {
                  latetasksNewFeed.find(function(element) {
                    if(element !== undefined){
                      return true
                    }
                    ;
                  }) ? 
                  <View style={styles.containerFeed}>
                    <View style={styles.containerTitle}>
                      <Text style={styles.titleFeed}>Late Task <FontAwesome name="circle" size={12} color="#D90033" /></Text>
                    </View>
                    <View style={styles.meetings}>
                    <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%'}}>
                      {latetasksNewFeed}
                    </ImageBackground>
                    </View>
                  </View> : null
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      );
  }
}

function mapStateToProps(state) {
  return {
    newfeeds: state.newfeeds,
    projects: state.projects,
    tasksNewFeed: state.tasksNewFeed,
    meetings: state.meetings,
    userDetail: state.userDetail,
    idMeetingShare: state.idMeetingShare,
    idProjectShare: state.idProjectShare
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detailMethodProject: (navigate, val) => {
      dispatch({ type: 'DETAIL_PROJECT',  
        id: val.id
      })
      navigate('Project')
    },
    detailMethodMeeting: (val, navigate) => {
      dispatch({ type: 'DETAIL_MEETING',
        id: val.id
    })
      navigate('Meeting')
    },
    detailTaskMethod: (navigate, val) => {
      dispatch({ type: 'ADD_ID_TASK_STATE',  
        id: val.id
      })
      navigate('HomeTask')
    },
    shareLineMeeting: (id, navigate) => {
      dispatch({ type: 'SET_ID_SHARE_MEETING',  
        id: id
      })
      navigate('JoinMeeting')
    },
    shareLineProject: (id, navigate) => {
      dispatch({ type: 'SET_ID_SHARE_PROJECT',  
        id: id
      })
      navigate('JoinProject')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topicContainer: {
    width: '100%',
    height: 100,
  },
  body: {
    flex: 1,
  },
  containerFeed: {
    margin: 10,
  },
  meetings: {
    backgroundColor: '#4A3C39',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  containerTitle: {
    backgroundColor: '#4A3C39',
    width: 150,
    textAlign: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  titleFeed: {
    padding: 10,
    paddingBottom: 5,
    fontFamily: 'Kanit-Regular',
    textAlign: 'center',
    color: '#f5f5dc',
  },
  whatIsNut: {
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
    fontFamily: 'Kanit-Regular',
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
    bottom: 120,
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
    fontFamily: 'Kanit-Medium'
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
  inputFeed: {
    width:75,
    height:75,
    margin:10,
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
});
