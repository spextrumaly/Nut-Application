import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Task from '../components/Task';
import { store } from '../Store/Store';

export default class TaskScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
        this.setState(() => {
            return { unseen: "does not display" }
        });
    }, 1000);
  }
    
  render() {
      let tasks = store.taskArray.map((val, key)=>{
          return <Task key={key} keyval={key} val={val}
                  deleteMethod={()=>this.deleteTask(key)}/>
      });
      return (
          <View style={styles.container}>
              <ScrollView style={styles.scrollContainer}>
                  {tasks}
              </ScrollView>
          </View>
      );
  }
  deleteTask(key){
    store.taskArray.splice(key, 1);
    this.setState({taskText: this.state.taskText});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100
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
      bottom: 90,
      backgroundColor: '#E91E63',
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
});
