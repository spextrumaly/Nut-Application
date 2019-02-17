import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import * as Progress from 'react-native-progress';

import { store } from '../Store/Store';

export default class HomeTaskScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    };
  }
  render() {
      const {navigate} = this.props.navigation;
      let taskName = store.taskArray.map((val, key)=>{
        if( val.id == store.TaskId){
          return val.task
        }
      });
      let taskStatus = store.taskArray.map((val, key)=>{
        if( val.id == store.TaskId){
          return val.status
        }
      });
      let taskDes = store.taskArray.map((val, key)=>{
        if( val.id == store.TaskId){
          return val.description
        }
      });
      let taskDeadline = store.taskArray.map((val, key)=>{
        if( val.id == store.TaskId){
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
              <Progress.Circle size={50} progress={0.9} color={'green'} showsText={true}/>
            </View>
          </View>
          <View style = { styles.containerScrollViewHolder }>
            <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
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
                        <CheckBox
                          title='Click Here'
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='Click Here'
                          checked={this.state.checked}
                        />
                      </View>
                    </View>
                  </View>                         
                </ScrollView>
              </View>
              <View style={styles.containerFooter}>
                <View style={styles.footer}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.doneTask(navigate)}>
                    <Text style={styles.signUpText}>Done Task</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.deleteTask(navigate)}>
                    <Text style={styles.signUpText}>Delete Task</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      );
  }

  doneTask(navigate) {
    store.taskArray.map((val)=>{
      if( val.id == store.TaskId){
        val.status = 'done';
      }
    });
    navigate('Project');
  }
  deleteTask(navigate) {
    store.taskArray.map((val, key)=>{
      if( val.id == store.TaskId){
        store.taskArray.splice(key, 1);
      }
    });
    navigate('Project');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  task: {
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    backgroundColor: "#f5f5dc",
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
  taskIcon:{
    width:50,
    height:50,
    margin:5,
    justifyContent: 'center'
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
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    color: 'black'
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
    maxHeight: '70%',
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
  item:
  {
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
  signupButton: {
    backgroundColor: "#f5f5dc",
  },
  signUpText: {
    color: '#4A3C39',
  },
});
