import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import * as Progress from 'react-native-progress';

import Task from '../components/Task';
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
      return (
        <View style={styles.container}>
          <View key={this.props.keyval} style={styles.task}>
            <Image style={styles.taskIcon} source={require('../assets/images/task.png')}/>
            <View>
              <Text style={styles.taskText}>Task</Text>
              <Text style={styles.inListText}>in list : Active</Text>
            </View>
            <Progress.Circle size={45} progress={0.9} color={'green'} showsText={true}/>
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
                      <View style = { styles.containerMember } >
                        <Image style={styles.avatarIcon} source={require('../assets/images/avatar.png')}/>
                        <Text style= { styles.memberText} >Undefinded User</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/due_date.png')}/>
                        <Text style= { styles.headCard} >DUE DATE</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >Undefinded deadline</Text>
                      </View>
                    </View>
                    <View style = { styles.containerTopic }>
                      <View style = { styles.containerMember } >
                        <Image style={styles.memberIcon} source={require('../assets/images/des.png')}/>
                        <Text style= { styles.headCard} >DESCRIPTION</Text>
                      </View>
                      <View style = { styles.containerMember } >
                        <Text style= { styles.deadlineText} >Undefinded DESCRIPTION</Text>
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
            </ImageBackground>
          </View>
        </View>
      );
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
  taskIcon:{
    width:50,
    height:50,
    margin:5,
    justifyContent: 'center'
  },
  containerMember: {
    flexDirection: 'row',
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
    flex: 1,
  },
  scrollViewHolder:
  { 
    margin: 10,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
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
});
