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
import moment from "moment";
import { store } from '../Store/Store';
import { connect } from 'react-redux'

import CheckBoxListTask from '../components/CheckBoxListTask';

class HomeTaskScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      checklist: [],
      text: 'Add item',
    };
  }

  render() {
      const {navigate} = this.props.navigation;
      let checklists = this.props.tasks.map((val)=>{
        if(val.id == this.props.TaskId){
          return val.checklists.map((checklist, key) => {
            return <CheckBoxListTask keyval={key} key={key} val={checklist}
            checkBoxMethod = {() => this.props.checkBoxMethod(this.props.tasks, this.props.TaskId, checklist)}
            />
          })
        }
      });
      let taskName = this.props.tasks.map((val)=>{
        if( val.id == this.props.TaskId){
          return val.task
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
            <Image style={styles.taskIcon} source={require('../assets/images/task.png')}/>
            <View>
              <Text style={styles.taskText}>{taskName}</Text>
              <Text style={styles.inListText}>in list : {taskStatus}</Text>
            </View>
            <View style={styles.containerProgress}>
              <Progress.Circle size={50} progress={this.statusbar() || 0} color={'green'} showsText={true}/>
            </View>
          </View>
          <View style = { styles.containerScrollViewHolder }>
            <ImageBackground source={require('../assets/images/bg.png')}style={{width: '100%', height: '100%'}}>
              <View style = { styles.scrollViewHolder }>
                <ScrollView>
                  <View style = { [styles.item, {width: '100%'} ]}>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/people.png')}/>
                        <Text style= { styles.headCard} >MEMBERS</Text>
                      </View>
                      <View style = { styles.containerMembers }>
                        <View style = { styles.containerMember }>
                          <Image style={styles.avatarIcon} source={require('../assets/images/avatar.png')}/>
                          <Text style= { styles.memberText} >Undefinded User</Text>
                        </View>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/due_date.png')}/>
                        <Text style= { styles.headCard} >DUE DATE</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >{taskDeadline}</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/des.png')}/>
                        <Text style= { styles.headCard} >DESCRIPTION</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >{taskDes}</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/checkList.png')}/>
                        <Text style= { styles.headCard} >CHECKLIST</Text>
                      </View>
                      <View style = { styles.containerCheckList } >
                        {console.log(checklists) || checklists ? checklists : null}
                        <View style={{flexDirection: 'row',}}>
                          <TextInput
                            style={{height: 30, borderColor: 'gray', borderWidth: 1, width: '40%', margin: 10, marginLeft: 15,}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                          />
                          <TouchableHighlight style={[styles.buttonContainerAddList, styles.addTaskButton]} onPress={() => this.props.addListTask(this.state.text, this.props.TaskId)}>
                            <Text style={styles.signUpText}>Add CheckList</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>                         
                </ScrollView>
              </View>
              <View style={styles.containerFooter}>
                <View style={styles.footer}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.doneTask(this.props.tasks, this.props.TaskId, navigate)}>
                    <Text style={styles.signUpText}>Done Task</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.deleteTask(this.props.tasks, this.props.TaskId, navigate)}>
                    <Text style={styles.signUpText}>Delete Task</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      );
  }

  statusbar() {
    let i = 0
    let len = 0
    this.props.tasks.map((val)=>{
      if(val.id == this.props.TaskId){
        len = val.checklists.length
        val.checklists.map((checklist) => {
          if(checklist.checked){
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
    addListTask: (name, taskId) => {
      var id = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));
      dispatch({ type: 'ADD_CHECKLIST_STATE',  
        name: name, id : id, taskId: taskId, checked: false
      })
    },
    deleteTask(tasks, taskId, navigate) {
      tasks.map((val, index)=>{
        if( val.id == taskId){
          const i = index
          dispatch({ type: 'DELETE_TASK',  
          index: i,
          newfeed : {
            'TaskName': val.task,
            'ProjectName': val.ProjectName,
            'createDate': timestamp,
            'status': 'deleteTask',
          }
        })
        }
      });
      navigate('Project');
    },
    doneTask(tasks, taskId, navigate) {
      dispatch({ type: 'DONE_TASK',  
        tasks: tasks, taskId : taskId
      })
      navigate('Project');
    },
    checkBoxMethod(tasks, taskId, value) {
      dispatch({ type: 'DONE_CHECKLIST',  
        tasks: tasks, taskId : taskId, value: value
      })
      console.log("Check : ", value)

    }
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    TaskId: state.TaskId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTaskScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: 'Kanit-Bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#f5f5dc'
  },
  inListText: {
    paddingLeft: 10,
  },
  containerScrollViewHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewHolder:
  { 
    maxHeight: '60%',
    margin: 10,
    marginTop: 20,
    backgroundColor: '#D3D3D3',
  },
  containerFooter: {
    margin: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
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
  },
  memberText: {
    fontSize: 15,
    padding: 5,
  },
  deadlineText: {
    fontSize: 15,
    padding: 5,
    marginLeft: 15,
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
    fontFamily: 'Kanit-Regular'
  },
});
