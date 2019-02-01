import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
export default class Project extends React.Component {
  render() {
    return (
        <View key={this.props.keyval} style={styles.project}>
            <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
            <View>
              <Text style={styles.projectText}>Create Date : {this.props.val.date}</Text>
              <Text style={styles.projectText}>Project : {this.props.val.ProjectName}</Text>
            </View>
            <TouchableOpacity onPress={this.props.deleteMethod} style={styles.projectDelete}>
                <Text style={styles.projectDeleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.detailMethod} style={styles.projectDetail}>
                <Text style={styles.projectDeleteText}>Detail</Text>
            </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    project: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth:2,
        borderBottomColor: '#ededed',
    },
    inputIcon:{
      width:30,
      height:30,
      margin:5,
      justifyContent: 'center'
    },
    projectText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63'
    },
    projectDelete: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A3C39',
        padding: 10,
        width: 70,
        marginLeft: 20,
        borderRadius:15,
      },
    projectDetail: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4A3C39',
      padding: 10,
      width: 70,
      marginLeft: 10,
      borderRadius:15,
  },
    projectDeleteText: {
        color: 'white'
    }
});