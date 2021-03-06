import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Task extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.task}>
              <TouchableOpacity onPress={this.props.detailTaskMethod}>
                <View style={styles.taskText}>
                  {/* <Text style={styles.taskText}>Create Date : {this.props.val.date}</Text> */}
                  {/* <Text style={styles.taskText}>Project : {this.props.val.name}</Text> */}
                  <Text style={styles.titleText}><FontAwesome name="tasks" size={13} color="#4A3C39" />  {this.props.val.task}</Text>
                  {/* <Text style={styles.taskText}>OWNER : {this.props.val.owner}</Text> */}
                </View>
                <View style={styles.containerPeople}>
                  <Text style={styles.taskText}>{this.props.val.ownerName}</Text>
                  <Image style={styles.peopleIcon} source={require('../assets/images/people.png')}/>
                </View>
                {/* <TouchableOpacity onPress={this.props.deleteMethod} style={styles.taskDelete}>
                    <Text style={styles.taskDeleteText}>Delete</Text>
                </TouchableOpacity> */}
              </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  task: {
    position: 'relative',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  peopleIcon:{
    width:15,
    height:15,
    margin:3,
  },
  containerPeople: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  taskText: {
    padding: 5,
    fontSize: 10,
    color: '#4A3C39',
    fontFamily: 'Kanit-Regular'
  },
  titleText: {
    fontSize: 15,
    color: '#4A3C39',
    fontFamily: 'Kanit-Medium'
  }
});