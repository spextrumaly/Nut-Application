import React from 'react';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  AlertIOS,
  Dimensions,
  Clipboard,
  ImageBackground,
} from 'react-native';
import Task from '../components/Task';
import MeetingOnProject from '../components/MeetingOnProject';
import { store } from '../Store/Store';
import moment from "moment";
import { connect } from 'react-redux'
import { fetchMember } from '../src/fetchData';

const showAnimation = "slideInUp"
const hideAnimation = "slideOutDown"

class ProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.fetchDispatchAllMember(this.props.ProjectId)
  }

  constructor(props){
    super(props);
    this.state = {
        taskText: '',
        taskOwner: '',
        showSelect: false,
        showCreate: false,
        showJoin: false,
        anim: false,
        members: []
    };
  }
  componentWillMount() {
    this.animatedValueAdd = new Animated.Value(0);
  }

  // renderMember = async () => {
  //   var id = this.props.ProjectId
  //   let members
  //   var memberRef = firebase.database().ref('project/' + id + '/member/')
  //   var query = memberRef.orderByKey()
  //   await query.once("value")
  //     .then(function(snapshot) {
  //       snapshot.forEach(function(childSnapshot) {
  //         var key = childSnapshot.key; // "ada"
  //         users = firebase.database().ref('user/' + key + '/name').once('value').then(function(snapshot) {
  //         members = members.push(snapshot.val())
  //         })
  //     });
  //   });
  //   return members

  // }

  // renderMember() {
  //   this.props.memberName.map((name) => {
  //     return <Text>{name}</Text>
  //   })
  // }
  
  render() {
    let members = this.props.memberName.map((val)=>{
      if(val) {
        return <Text>{val}</Text>
      }
    });
    // this.fetchMember((name) => {
    //   this.setState({ members: name})
    // })
    // var meetingRef = await firebase.database().ref('user/' + user.uid + '/meeting/')
    // var meetingPlanRef = await firebase.database().ref('user/' + user.uid + '/meetingPlan/')
    // projectRef.remove()
    // meetingRef.remove()
    // meetingPlanRef.remove()
    // var query = firebase.database().ref("task").orderByKey();
    // query.once("value")
    //   .then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var key = childSnapshot.key; // "ada"
    //       testRef = firebase.database().ref('task/' + key + '/ownerName').once('value').then(function(snapshot) {
    //         var owner = snapshot.val()
    //         if(owner === user.displayName){
    //           firebase.database().ref('task/' + key).remove()
    //         }
    //       })
    //       // Cancel enumeration
    //   });
    // });
    return (
      <View style={styles.container}>
        <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <Text style={styles.taskText}>Summary</Text>
          </View>
        </View>
      <View style={styles.body}>
       {members}
      </View>
    </View>
    );
  }

  addTask(){
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
    ProjectId: state.ProjectId,
    memberName: state.memberName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDispatchAllMember: (id) => {
      dispatch({ type: 'FETCH_CLEAR_MEMBER' })
      fetchMember((members) => {
        dispatch({ type: 'FETCH_ALL_MEMBER', payload: members })
      }, id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollViewHolder: {
    flex: 1,
  },
  containerBtn: {
    flexDirection: 'row'
  },
  containerCard: {
    borderRadius: 5,
    zIndex: 4
  },
  scrollViewHolder: { 
    margin: 10,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#e6e0df',
    borderRadius: 5,
    opacity: 0.75,
    flex: 1,
    padding: 15,
    marginRight: 10,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  textSubHeader: {
    textAlign: 'left',
    fontSize: 14,
    padding: 5,
  },
  textSubHeaderCenter: {
    textAlign: 'center',
    fontSize: 14,
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
    paddingTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
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
  task: {
    position: 'relative',
    padding: 15,
    paddingTop: 40,    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4A3C39",
  },
  inputIcon:{
    width:70,
    height:70,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Kanit-Bold',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#f5f5dc'
  },
  taskSubText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f5f5dc'
  },
  projectDeleteText: {
    fontSize: 13,
    fontFamily: 'Kanit-Regular',
    color: '#4A3C39',
  },
  projectDelete: {
    backgroundColor: '#f5f5dc',
    padding: 10,
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius:5,
    margin: 10,
    marginBottom: 5,
  },
  headCard: {
    fontSize: 17,
    color: '#4A3C39',
    textTransform: 'uppercase',
    fontFamily: 'Kanit-Medium',
    marginBottom: 10,
  },
  signUpText: {
    color: 'white',
    fontFamily: 'Kanit-Medium'
  },
});
