import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
export default class MeetingOnProject extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.task}>
              <TouchableOpacity onPress={this.props.detailMethod}>
                <View style={styles.taskText}>
                  {/* <Text style={styles.taskText}>Create Date : {this.props.val.date}</Text> */}
                  {/* <Text style={styles.taskText}>Project : {this.props.val.name}</Text> */}
                  <Text>Meeting : {this.props.val.meetingName}</Text>
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
    backgroundColor: '#f5f5dc',
    borderRadius: 10
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
    fontSize: 10
  },
});