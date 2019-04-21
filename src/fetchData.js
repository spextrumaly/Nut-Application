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

export function fetchAllProject(callback, clearFunction) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/'+ uID +'/project/')
  .on('value',function(snapshot){
    clearFunction()
    snapshot.forEach(function(child){
      firebase.database().ref('project/' + child.key)
        .once('value', function(snapshot){
          callback(snapshot.val())
        })
    })
  })
}

export function fetchAllMeeting(callback, clearFunction) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/'+ uID +'/meeting/')
  .on('value',function(snapshot){
    clearFunction()
    snapshot.forEach(function(child){
      firebase.database().ref('meeting/' + child.key)
        .once('value', function(snapshot){
          console.log("test:", snapshot.val())
          callback(snapshot.val())
        })
    })
  })
}

export function fetchAllMeetingPlan(callback, clearFunction) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('user/'+ uID +'/meetingPlan/')
  .on('value',function(snapshot){
    clearFunction()
    snapshot.forEach(function(child){
      firebase.database().ref('meetingPlan/' + child.key)
        .once('value', function(snapshot){
          console.log("test:", snapshot.val())
          callback(snapshot.val())
        })
    })
  })
}

export function fetchAllTask(callback, projectID) {
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

export function fetchAllTaskNewFeed(callback, clearFunction) {
  let uID =  firebase.auth().currentUser.uid;
  firebase.database().ref('task/')
  .on('value',function(snapshot){
    clearFunction()
    snapshot.forEach(function(child){
      firebase.database().ref('task/' + child.key)
        .once('value', function(snapshot){
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
  meetingRef = firebase.database().ref('meetingPlan/' + meetingCode+'/member/')
  userRef = firebase.database().ref('user/' + uID +'/meetingPlan/')
  // add uid to member of the project
  meetingRef.child(uID).update({
    status : 'member',
    timestamp : Date.now()
  })
  userRef.update({
    [meetingCode] : true
  })
}

export function changeStatus(status, taskID){
  let taskRef =  firebase.database().ref('task/'+ taskID);
  taskRef.update({
    status : status 
  })
}

export function addNewChecklist( name, taskID ){
	checkListRef =  firebase.database().ref('task/'+ taskID + '/checklist/')
	checkListRef.push({
		name : name,
		checked : false,
	}).then((snap) => {
		const newKey = snap.key
		checkListRef.child(newKey).update({
		id : newKey
		})
  })
}

export function addVote( indexVote, meetingId ){
  vote =  firebase.database().ref('meetingPlan/'+ meetingId + '/vote/')
  indexVote.map((i) => {
    vote.push().set(i)
  })
}

export function addCheckedChecklist( taskID, checklistValue ){
	ref = firebase.database().ref('task/'+ taskID + '/checklist/' + checklistValue.id)
	ref.update({
	  checked : !checklistValue.checked
  })
}


