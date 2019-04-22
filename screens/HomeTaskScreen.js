import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import * as Progress from 'react-native-progress';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';
import moment from "moment";
import { store } from '../Store/Store';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";
import { fetchAllTask, changeStatus, addNewChecklist, addCheckedChecklist } from '../src/fetchData';

import CheckBoxListTask from '../components/CheckBoxListTask';

class HomeTaskScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      checklist: [],
      text: '',
    };
  }

  render() {
      const {navigate} = this.props.navigation;
      let checklist = this.props.tasks.map((val)=>{
        if(val.id == this.props.TaskId){
          if(val.checklist){
              return Object.keys(val.checklist).map((key) => {
                const aChecklist = val.checklist[key]
                  return <CheckBoxListTask keyval={key} key={key} val={aChecklist}
                  checkBoxMethod = {() => this.props.checkBoxMethod(this.props.TaskId, aChecklist, this.props.ProjectId)}
                  />
              })
          }
        }
      });
      let taskName = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          console.log(val)
          return val.task
        }
      });
      let ownerName = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          return val.ownerName
        }
      });
      let taskStatus = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          return val.status
        }
      });
      let taskDes = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          return val.description
        }
      });
      let taskDeadline = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          return val.deadlineDate
        }
      });
      return (
        <View style={styles.container}>
          <View key={this.props.keyval} style={styles.task}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')} />
            <View>
              <Text style={styles.taskText}>{taskName}</Text>
              <Text style={styles.inListText}>Status: {taskStatus}</Text>
              <View style={styles.progress}>
                <Progress.Bar color={'#f5f5dc'} progress={this.statusbar() || 0} width={130} />
              </View>
            </View>
            {/* <View style={styles.containerProgress}>
              <Progress.Circle size={50} progress={this.statusbar() || 0} color={'#f5f5dc'} showsText={true}/>
            </View> */}
          </View>
          <View style = { styles.containerScrollViewHolder }>
            <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <View style = { styles.scrollViewHolder }>
                <ScrollView>
                  <View style = { [styles.item, {width: '100%'} ]}>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        {/* <Image style={styles.memberIcon} source={require('../assets/images/people.png')}/> */}
                        <Text style= { styles.headCard} >OWNER MEMBERS</Text>
                      </View>
                      <View style = { styles.containerMembers }>
                        <View style = { styles.containerMember }>
                          {/* <Image style={styles.avatarIcon} source={require('../assets/images/avatar.png')}/> */}
                          <Text style= { styles.memberText} >{ownerName}</Text>
                        </View>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        {/* <Image style={styles.memberIcon} source={require('../assets/images/due_date.png')}/> */}
                        <Text style= { styles.headCard} >DUE DATE</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >{taskDeadline}</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        {/* <Image style={styles.memberIcon} source={require('../assets/images/des.png')}/> */}
                        <Text style= { styles.headCard} >DESCRIPTION</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >{taskDes}</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerCheckList } >
                        <View>
                          {/* <TextInput
                            style={{height: 30, width: '40%', margin: 10, marginLeft: 15, color: 'gray', backgroundColor: 'white'}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                          /> */}
                            <Makiko
                              label={'Add checklist here'}
                              iconClass={FontAwesomeIcon}
                              iconName={'pencil'}
                              onChangeText={(text) => this.setState({text})}
                              onEndEditing={() => {this.props.addListTask(this.state.text, this.props.TaskId, this.props.ProjectId); this.setState({text: ''});}}
                              value={this.state.text}
                              iconColor={'white'}
                              inputStyle={{ color: '#4A3C39', textAlign: 'center',fontFamily: 'Kanit-Regular' }}
                            />
                          {/* <TouchableHighlight style={[styles.buttonContainerAddList, styles.addTaskButton]} onPress={() => this.props.addListTask(this.state.text, this.props.TaskId, this.props.ProjectId)}>
                            <Text style={styles.signUpText}>Add CheckList</Text>
                          </TouchableHighlight> */}
                        </View>
                        { checklist ? checklist : null}
                      </View>
                    </View>
                  </View>                         
                </ScrollView>
              </View>
              <View style={styles.containerFooter}>
                <View style={styles.footer}>
                <AwesomeButton
                style={{opacity: 0.8, marginLeft: 10, marginRight: 10}}
                  backgroundDarker='#4A3C39'
                  backgroundColor='#7B6B68'
                  width={150}
                  borderRadius={10}
                  onPress={() => this.props.doneTask(this.props.tasks, this.props.TaskId, navigate, this.props.ProjectId)}>
                  <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Done</Text>
                </AwesomeButton>
                <AwesomeButton
                style={{opacity: 0.8, marginLeft: 10, marginRight: 10}}
                  backgroundDarker='#4A3C39'
                  backgroundColor='#7B6B68'
                  width={150}
                  borderRadius={10}
                  onPress={() => this.props.deleteTask(this.props.tasks, this.props.TaskId, navigate, this.props.ProjectId)}>
                  <Text style={{ color: '#f5f3f2', fontFamily: 'Kanit-Medium' }}>Delete</Text>
                </AwesomeButton>
                  {/* <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.doneTask(this.props.tasks, this.props.TaskId, navigate, this.props.ProjectId)}>
                    <Text style={styles.signUpText}>Done Task</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.deleteTask(this.props.tasks, this.props.TaskId, navigate, this.props.ProjectId)}>
                    <Text style={styles.signUpText}>Delete Task</Text>
                  </TouchableHighlight> */}
                </View>
              </View>
            </ScrollView>
            </ImageBackground>
          </View>
        </View>
      );
  }

  statusbar() {
    let i = 0
    let len = 0
    this.props.tasks.map((val)=>{
      if(val.id == this.props.TaskId && val.checklist){
        len = Object.keys(val.checklist).length
        Object.keys(val.checklist).map((key) => {
          const aChecklist = val.checklist[key]
            if(aChecklist.checked) {
              i = i + 1
            }
        })
      }
    });
    return i/len
  }
}

function mapDispatchToProps(dispatch) {
  var timestamp = moment().format();
  return {
    addListTask: (name, taskId, projectId) => {
      addNewChecklist(name, taskId)
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTask((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK', payload: tasks })
      }, projectId)
    },
    deleteTask(tasks, taskId, navigate, projectId) {
      firebase.database().ref('task/' + taskId).remove()
      firebase.database().ref('project/' + projectId + '/task/' + taskId).remove()
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTask((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK', payload: tasks })
      }, projectId)
      navigate('Project');
    },
    doneTask(tasks, taskId, navigate, projectId) {
      changeStatus('done', taskId)
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTask((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK', payload: tasks })
      }, projectId)
      navigate('Project');
    },
    checkBoxMethod(taskId, value, projectId) {
      addCheckedChecklist( taskId, value )
      dispatch({ type: 'FETCH_CLEAR_ALL_TASK' })
      fetchAllTask((tasks) => {
        dispatch({ type: 'FETCH_ALL_TASK', payload: tasks })
      }, projectId)
    }
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    TaskId: state.TaskId,
    ProjectId: state.ProjectId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTaskScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskIcon: {
    maxWidth: 50,
    maxHeight: 50
  },
  containerTopic: {
    marginBottom: 20,
  },
  containerProgress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 3,
  },
  containerMember: {
    flexDirection: 'row',
  },
  containerMembers: {
    flexDirection: 'column',
  },
  containerCheckList: {
    flexDirection: 'column',
  },
  memberIcon:{
    width:25,
    height:25,
    margin:5,
    justifyContent: 'center'
  },
  avatarIcon:{
    width:20,
    height:20,
    margin:5,
    justifyContent: 'center',
    marginLeft: 20,
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
    width:50,
    height:50,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 10,
    fontFamily: 'Kanit-Bold',
    color: '#f5f5dc'
  },
  inListText: {
    paddingLeft: 10,
    color: '#f5f5dc',
    fontFamily: 'Kanit-Medium',
  },
  progress: {
    paddingLeft: 10,
    paddingTop: 10
  },
  containerScrollViewHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewHolder:
  { 
    maxHeight: '75%',
    margin: 10,
    marginTop: 20,
    backgroundColor: '#f5f3f2',
    opacity: 0.6,
    borderRadius: 10,
  },
  containerFooter: {
    margin: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    marginRight: 10,
  },
  headCard: {
    fontSize: 18,
    padding: 5,
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium',

  },
  memberText: {
    fontSize: 15,
    padding: 5,
    marginLeft: 15,
    color: '#4A3C39',
    fontFamily: 'Kanit-Regular'
  },
  deadlineText: {
    fontSize: 15,
    padding: 5,
    marginLeft: 15,
    color: '#4A3C39',
    fontFamily: 'Kanit-Regular',
  },
  buttonContainer: {
    height: 45,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: 5,
    borderRadius:10,
  },
  buttonContainerAddList: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    margin: 10,
    marginLeft: 8,
    borderRadius:10,
  },
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  addTaskButton: {
    backgroundColor: "#FFFFFF",
  },
  signUpText: {
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  },
});
