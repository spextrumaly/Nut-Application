import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
export default class Task extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.task}>
                <Text style={styles.taskText}>Create Date : {this.props.val.date}</Text>
                <Text style={styles.taskText}>Project : {this.props.val.ProjectName}</Text>
                <Text style={styles.taskText}>TASK : {this.props.val.task}</Text>
                <Text style={styles.taskText}>OWNER : {this.props.val.owner}</Text>
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
        paddingRight: 100,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderBottomColor: '#ededed',
        borderTopColor: '#ededed',
        paddingTop: 30
    },
    taskText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63'
    },
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    taskDeleteText: {
        color: 'white'
    }
});