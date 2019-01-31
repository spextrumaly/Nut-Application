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

export default class ProjectScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        taskText: '',
        taskOwner: '',
    };
  }
  componentDidMount() {
    setInterval(() => {
        this.setState(() => {
            return { unseen: "does not display" }
        });
    }, 1000);
  }
  render() {
      const {navigate} = this.props.navigation;
      let tasks = store.taskArray.map((val, key)=>{
        if( val.ProjectName == store.ProjectName)
          return <Task key={key} keyval={key} val={val}
                  deleteMethod={()=>this.deleteTask(key)}/>
      });
      let id = store.projectArray.map((val, key)=>{
        if( val.ProjectName == store.ProjectName)
          return val.id
      });
      return (
          <View style={styles.container}>
              <Text style={styles.textHeader}>
                {store.ProjectName}
              </Text>
              <Text style={styles.textSubHeaderCenter}>
                id : {id}
              </Text>
              <Text style={styles.textSubHeader}>
                List Task
              </Text>
              <ScrollView style={styles.scrollContainer}>
                  {tasks}
              </ScrollView>
              <TouchableOpacity onPress={ () => this.addtask(navigate) } style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
          </View>
      );
  }
  addtask(navigate){
    navigate('CreateTask')
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
  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  textSubHeader: {
    textAlign: 'left',
    fontSize: 14,
    padding: 5,
  },
  textSubHeaderCenter: {
    textAlign: 'center',
    fontSize: 14,
    padding: 5,
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100,
      paddingTop: 10
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
      bottom: 40,
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
});
