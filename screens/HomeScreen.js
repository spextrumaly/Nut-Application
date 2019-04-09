import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import NewFeed from '../components/NewFeed';
import { store } from '../Store/Store';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super(props);
  }

  render() {
    console.log("Home newfeed", this.props.newfeeds)
      const {navigate} = this.props.navigation;
      let newfeeds = this.props.newfeeds.map((val, key)=>{
          return <NewFeed key={key} keyval={key} val={val}
          detailProjectMethod={() => this.detailProjectMethod(navigate, val)}
          detailTaskMethod={() => this.detailTaskMethod(navigate, val)}
          />
      });
      return (
          <View style={styles.container}>
            <View key={this.props.keyval} style={styles.task}>
              <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
              <View>
                <Text style={styles.taskText}>New Feeds</Text>
              </View>
            </View>
            {/* <Image style={styles.topicContainer} resizeMode={'contain'} source={require('../assets/images/whatisnut.png')}/> */}
            <View style={styles.body}>
              <ScrollView style={styles.scrollContainer}>
              <View style={styles.projectContainer}>
                {newfeeds.reverse()}
              </View>
              </ScrollView>
            </View>
          </View>
      );
  }
  detailProjectMethod(navigate, val){
    store.ProjectName = val.ProjectName;
    store.ProjectId = val.ProjectID;
    navigate('Project')
  }
  detailTaskMethod(navigate, val){
    store.TaskName = val.task;
    store.TaskId = val.id;
    navigate('HomeTask')
  }
}

function mapStateToProps(state) {
  return {
    newfeeds: state.newfeeds
  }
}

export default connect(mapStateToProps)(HomeScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DCDCDC',
  },
  topicContainer: {
    width: '100%',
    height: 100,
  },
  body: {
    flex: 1,
  },
  whatIsNut: {
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 10,
      backgroundColor: '#252525',
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 20,
      backgroundColor: '#4A3C39',
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24
  },
  buttonAdd: {
    position: 'absolute',
    zIndex: 11,
    bottom: 120,
    width: 150,
    right: 17,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddStyle: {
    marginBottom: 10,
    backgroundColor: '#4A3C39',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    marginLeft:5,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#4A3C39",
  },
  signUpText: {
    color: 'white',
  },
  task: {
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    backgroundColor: "#f5f5dc",
  },
  inputIcon:{
    width:50,
    height:50,
    margin:5,
    justifyContent: 'center'
  },
  inputFeed: {
    width:75,
    height:75,
    margin:10,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#4A3C39'
  },
});
