import React from 'react';
import * as Animatable from 'react-native-animatable';
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Task from '../components/Task';
import MeetingOnProject from '../components/MeetingOnProject';
import { store } from '../Store/Store';
import moment from "moment";
import { connect } from 'react-redux'

const showAnimation = "slideInUp"
const hideAnimation = "slideOutDown"

class ProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
        taskText: '',
        taskOwner: '',
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
      let id = this.props.projects.map((val) => {
        if(val.id == this.props.ProjectId) {
          return val.id
        }
      })

      let name = this.props.projects.map((val) => {
        if(val.id == this.props.ProjectId) {
          return val.ProjectName
        }
      })

      this.props.tasks.map((val, key)=>{
        if( moment().isAfter(val.deadlineDate)){
          this.props.lateTask(this.props.tasks, this.props.TaskId, navigate)
        }
      });

      let activeTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'active') {
            return <Task key={key} keyval={key} val={val}
            deleteMethod={()=>this.deleteTask(key)}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let activeMeetings = this.props.meetings.map((val, key)=>{
        if( val.meetingOnProjectId == this.props.ProjectId){
          return <MeetingOnProject key={key} keyval={key} val={val}
          deleteMethod={()=>this.deleteTask(key)}
          detailMethod={() => this.props.detailMethod(val, navigate)}
          />
        }
      });

      let lateTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'late') {
            return <Task key={key} keyval={key} val={val}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let doneTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'done') {
            return <Task key={key} keyval={key} val={val}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let screenWidth = Dimensions.get('window').width;

      return (
          <View style={styles.container}>
              <View style={styles.task}>
                <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
                <View>
                  <Text style={styles.taskText}>{name}</Text>
                  <Text style={styles.taskSubText}>id : {id}</Text>
                  <TouchableOpacity onPress={() => this.props.deleteProject(this.props.projects, this.props.ProjectId, navigate)} style={styles.projectDelete}>
                    <Text style={styles.projectDeleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style = { styles.containerScrollViewHolder }>
                <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
                  <View style = { styles.scrollViewHolder }>
                    <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Active</Text>
                        <ScrollView style = { styles.containerCard}>
                          {activeMeetings}
                          {activeTasks}
                        </ScrollView>                      
                      </View>
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Late</Text>
                        <ScrollView style = { styles.containerCard}>
                          {lateTasks}
                        </ScrollView>                      
                      </View>                 
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Done</Text>
                        <ScrollView style = { styles.containerCard}>
                          {doneTasks}
                        </ScrollView>                      
                      </View>                             
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
              {/* <ScrollView style={styles.scrollContainer}>
                  {tasks}
              </ScrollView> */}
              {this.state.showSelect == true ? 
              <View style={styles.buttonAdd}>
              <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} >
                  <AwesomeButton 
                    style={styles.createBtnAnimate}
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    width={170}
                    borderRadius={30}
                    onPress= {() => {this.props.navigation.navigate('CreateMeeting'); this.props.ContinueMeeting(this.props.meetingOnProjectId, this.props.ProjectId, navigate); this.setState({showSelect: false}); this.setState({anim: false});}}
                    >
                    <Text style={styles.signUpText}>Create Project Meeting</Text>
                  </AwesomeButton>
                </Animatable.View>
              </Animatable.View>
              <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} >
                  <AwesomeButton 
                    style={styles.joinBtnAnimate}
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    width={170}
                    borderRadius={30}
                    onPress= {() => {this.props.navigation.navigate('CreateTask'); this.setState({showSelect: false}); this.setState({anim: false});}}
                    >
                    <Text style={styles.signUpText}>Create Project Task</Text>
                  </AwesomeButton>
                </Animatable.View>
              </Animatable.View>
              </View>
              : null }
              <View style={styles.footerFlex}>
                <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                  <AwesomeButton 
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    borderRadius={100}
                    paddingTop={10}
                    paddingBottom={10}
                    paddingHorizontal={10}
                    width={80}
                    onPress={ this.addTask.bind(this)} 
                    style={styles.addButton}>
                    <Text style={styles.addButtonText}>{!this.state.anim ? '+' : 'x'}</Text>
                  </AwesomeButton>
                </Animatable.View>
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



function mapDispatchToProps(dispatch) {
  return {
    detailMethod: (val, navigate) => {
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
    lateTask(tasks, taskId, navigate) {
      dispatch({ type: 'LATE_TASK',  
        tasks: tasks, taskId : taskId
      })
      navigate('Project');
    },
    deleteProject: (projects, projectId, navigate) => {
      var timestamp = moment().format();
      projects.map((val, index)=>{
        if( val.id == projectId){
          const i = index
          dispatch({ type: 'DELETE_PROJECT',  
          index: i,
          newfeed : {
            'ProjectName': val.ProjectName,
            'createDate': timestamp,
            'status': 'deleteProject',
          }
        })
        }
      });
      navigate('HomeProject');
    },
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    TaskId: state.TaskId,
    projects: state.projects,
    ProjectId: state.ProjectId,
    meetings: state.meetings,
    meetingOnProjectId: state.meetingOnProjectId,
    ProjectId: state.ProjectId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ContinueTask: (navigate) => {
      navigate('CreateTask')
    },
    ContinueMeeting: (meetingOnProjectId, ProjectId, navigate) => {
      dispatch({ type: 'CREATE_MEETING_ON_PROJECT',  
        id: ProjectId
      })
      navigate('CreateMeeting')
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
  containerCard: {
    borderRadius: 10,
  },
  scrollViewHolder: { 
    margin: 10,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#D3D3D3',
    flex: 1,
    padding: 10,
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
    paddingBottom: 10,
    color: '#f5f5dc'
  },
  taskSubText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f5f5dc'
  },
  projectDeleteText: {
    fontSize: 13,
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
    marginBottom: 10,
  },
  signUpText: {
    color: 'white',
    fontFamily: 'Kanit-Regular'
  },
});
