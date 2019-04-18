import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export function fetchAllData(callback) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/' + uID)
  .once('value', function(snapshot){
    console.log(snapshot.val())
    callback(snapshot.val())
  })
}

export function fetchAllProject(callback) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/'+ uID +'/project/')
  .once('value',function(snapshot){
    snapshot.forEach(function(child){
      firebase.database().ref('project/' + child.key)
        .once('value', function(snapshot){
          callback(snapshot.val())
        })
    })
  })
}

export function fetchAllMeeting(callback) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/'+ uID +'/meeting/')
  .once('value',function(snapshot){
    snapshot.forEach(function(child){
      firebase.database().ref('meeting/' + child.key)
        .once('value', function(snapshot){
          callback(snapshot.val())
        })
    })
  })
}

export function fetchAllTask(callback, projectID) {
  console.log("project id : ", projectID)
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('project/' +projectID+'/task')
  .once('value',function(snapshot){
    snapshot.forEach(function(child){
      firebase.database().ref('task/' + child.key)
        .once('value', function(snapshot){
          console.log("Snapshot : ", snapshot.val())
          callback(snapshot.val())
        })
    })
  })
}

export function joinProject(projectCode){
  // rom ku
  let uID =  firebase.auth().currentUser.uid;
  projectRef = firebase.database().ref('project/' + projectCode+'/member/')
  userRef = firebase.database().ref('user/' + uID +'/project/')
  // add uid to member of the project
  projectRef.child(uID).update({
    status : 'member',
    timestamp : Date.now()
  })
  userRef.update({
    [projectCode] : true
  })
}

export function joinMeeting(meetingCode){
  // rom ku
  let uID =  firebase.auth().currentUser.uid;
  meetingRef = firebase.database().ref('meeting/' + meetingCode+'/member/')
  userRef = firebase.database().ref('user/' + uID +'/meeting/')
  // add uid to member of the project
  meetingRef.child(uID).update({
    status : 'member',
    timestamp : Date.now()
  })
  userRef.update({
    [meetingCode] : true
  })
 }
 