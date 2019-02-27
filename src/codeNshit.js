import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export function authUser(credential){
    firebase
       .auth()
       .signInAndRetrieveDataWithCredential(credential)
       .then( res => {
         if (res.additionalUserInfo.isNewUser) {
           console.log('new users');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .set({
              name: res.user.displayName,
              mail: res.user.email,
              last_logged_in: Date.now(),
            });
         } else {
           console.log('old user');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .update({
              last_logged_in: Date.now()
            });
         }
         AsyncStorage.setItem('userToken', token);
         this.props.navigation.navigate('App');
       })
       .catch( error => {
        console.log("firebase cred err:", error);
       })
}

export function fetchProject(uid) {
    // uid = facebook || google uid
    firebase
     .database()
     .ref('user/' + uid + '/project')
     .once('value', function(snapshot){
        snapshot.forEach( function(child) {
            var projectID = child.key;;
            console.log("the project id is " + projectID);
            firebase
             .database()
             .ref('project/'+ projectID)
             .once('value', function(snapshot) {
                console.log(snapshot.val().name);
             });
        });
     });

}

export function test() {
    console.log('this is test function');
}