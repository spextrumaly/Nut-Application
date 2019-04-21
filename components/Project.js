import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import moment from "moment";

export default class Project extends React.Component {
  render() {
    return (
        <View key={this.props.keyval} style={styles.project}>
          <TouchableOpacity onPress={this.props.detailMethod}>
            <View style={styles.headCard}>
              <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
              <View>
                <Text style={styles.nameText}>{this.props.val.name}</Text>
                <Text style={styles.projectOwnerText}>{this.props.val.ownerName}</Text>
              </View>
              <View style={styles.bodyDeadline}>
                <Text style={styles.projectText}>Deadline: {this.countDown(this.props.val.deadlineDate,this.props.val.createDate)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
    );
  }

  countDown(deadlineDate, createDate) {
    return moment(deadlineDate).from(createDate);
  }
}
const styles = StyleSheet.create({
  project: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth:1,
    borderBottomColor: '#ffffff',
    borderTopWidth:1,
    borderTopColor: '#ffffff',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'white',
  },
    headCard: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    inputIcon:{
      width:50,
      height:50,
    },
    bodyDeadline: {
      position: 'absolute',
      zIndex: 11,
      right: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameText: {
      paddingLeft: 10,
      fontSize: 20,
      fontFamily: 'Kanit-Medium'
    },
    projectOwnerText: {
      paddingLeft: 10,
      fontSize: 10,
      fontFamily: 'Kanit-Italic'
    },
    projectText: {
      fontSize: 10,
      color: '#696969',
      fontFamily: 'Kanit-Regular'
    },
    projectDelete: {
        backgroundColor: '#4A3C39',
        padding: 10,
        width: 70,
        marginLeft: 20,
        borderRadius:15,
      },
    projectDetail: {
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