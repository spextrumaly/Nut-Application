import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import moment from "moment";

export default class NewFeed extends React.Component {
  render() {  
    return (
        <View>
          <View key={this.props.keyval} style={styles.project}>
          {this.createNewFeed()}
          </View>
        </View>
    );
  }

  createNewFeed() {
    if(this.props.val.status == 'createProject'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Created project {this.props.val.ProjectName}</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    if(this.props.val.status == 'deleteProject'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Delete project {this.props.val.ProjectName}</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    if(this.props.val.status == 'createTask'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Created task {this.props.val.task}</Text>
              <Text style={styles.projectOwnerText}>on {this.props.val.ProjectName} Project</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    if(this.props.val.status == 'deleteTask'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Delete task {this.props.val.task}</Text>
              <Text style={styles.projectOwnerText}>on {this.props.val.ProjectName} Project</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    if(this.props.val.status == 'createMeeting'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Created meeting {this.props.val.meetingName}</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    if(this.props.val.status == 'deleteMeeting'){
      return <TouchableOpacity>
        <View style={styles.headCard}>
          <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
          <View>
            <View>
              <Text style={styles.projectNameText}>Delete meeting {this.props.val.meetingName}</Text>
              <Text style={styles.projectOwnerText}>by Undefind User</Text>
            </View>
          </View>
          <View style={styles.bodyDeadline}>
            <Text style={styles.projectText}>{this.relativeTime(this.props.val.createDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
  }

  relativeTime(date) {
    return moment(date).fromNow();
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
      bottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    projectNameText: {
      paddingLeft: 10,
      fontSize: 20,
      fontFamily: 'Kanit-Medium',
      color: '#4A3C39',
    },
    projectOwnerText: {
      paddingLeft: 10,
      fontSize: 10,
      fontFamily: 'Kanit-Italic',
      
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
    },
    topicContainer: {
      width: '100%',
      height: 100,
    },
});