import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Task from '../components/Task';
import { store } from '../Store/Store';

export default class ProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
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
              <View style={styles.task}>
                <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
                <View>
                  <Text style={styles.taskText}>{store.ProjectName}</Text>
                  <Text style={styles.taskSubText}>id : {id}</Text>
                  <TouchableOpacity onPress={() => this.deleteProject(navigate)} style={styles.projectDelete}>
                    <Text style={styles.projectDeleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  deleteProject(navigate) {
    store.taskArray.map((val, key)=>{
      if( val.ProjectName == store.ProjectName)
        store.taskArray.splice(key, 1);
    });
    store.projectArray.map((val, key)=>{
      if( val.ProjectName == store.ProjectName)
        store.projectArray.splice(key, 1);
    });
    navigate('HomeProject')
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
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#4A3C39'
  },
  taskSubText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#4A3C39'
  },
  projectDeleteText: {
    fontSize: 13,
    color: '#f5f5dc',
  },
  projectDelete: {
    backgroundColor: '#4A3C39',
    padding: 10,
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius:5,
    margin: 10,
    marginBottom: 5,
  },
});
