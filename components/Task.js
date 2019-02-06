import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
export default class Task extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.task}>
              <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
              <View>
                <Text style={styles.taskText}>Create Date : {this.props.val.date}</Text>
                <Text style={styles.taskText}>Project : {this.props.val.ProjectName}</Text>
                <Text style={styles.taskText}>TASK : {this.props.val.task}</Text>
                <Text style={styles.taskText}>OWNER : {this.props.val.owner}</Text>
              </View>
              <TouchableOpacity onPress={this.props.deleteMethod} style={styles.taskDelete}>
                  <Text style={styles.taskDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    task: {
      position: 'relative',
      padding: 20,
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth:1,
      borderBottomColor: '#ededed',
      borderTopWidth:1,
      borderTopColor: '#ededed',
      margin: 5,
      marginLeft: 0,
      marginRight: 0,
    },
    inputIcon:{
      width:50,
      height:50,
      margin:5,
      justifyContent: 'center'
    },
    taskText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63',
    },
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A3C39',
        padding: 10,
        top: 30,
        bottom: 10,
        right: 10,
        width: 80,
        height: 50,
        borderRadius:15,
      },
    taskDeleteText: {
        color: 'white'
    }
});