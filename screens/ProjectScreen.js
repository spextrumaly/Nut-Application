import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Task from '../components/Task';
import { store } from '../Store/Store';
import moment from "moment";
import { connect } from 'react-redux'

class ProjectScreen extends React.Component {
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

  render() {
      const {navigate} = this.props.navigation;
      let id = this.props.projects.map((val) => {
        if(val.id == this.props.ProjectId) {
          return val.id
        }
      })

      let name = this.props.projects.map((val) => {
        if(val.id == this.props.ProjectId) {
          return val.ProjectName
        }
      })

      this.props.tasks.map((val, key)=>{
        if( moment().isAfter(val.deadlineDate)){
          this.props.lateTask(this.props.tasks, this.props.TaskId, navigate)
        }
      });

      let activeTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'active') {
            return <Task key={key} keyval={key} val={val}
            deleteMethod={()=>this.deleteTask(key)}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let lateTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'late') {
            return <Task key={key} keyval={key} val={val}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let doneTasks = this.props.tasks.map((val, key)=>{
        if( val.ProjectID == this.props.ProjectId){
          if(val.status == 'done') {
            return <Task key={key} keyval={key} val={val}
            detailTaskMethod={() => this.props.detailTaskMethod(navigate, val)}
            />
          }
        }
      });

      let screenWidth = Dimensions.get('window').width;

      return (
          <View style={styles.container}>
              <View style={styles.task}>
                <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
                <View>
                  <Text style={styles.taskText}>{name}</Text>
                  <Text style={styles.taskSubText}>id : {id}</Text>
                  <TouchableOpacity onPress={() => this.props.deleteProject(this.props.projects, this.props.ProjectId, navigate)} style={styles.projectDelete}>
                    <Text style={styles.projectDeleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style = { styles.containerScrollViewHolder }>
                <ImageBackground source={require('../assets/images/bg.jpg')}style={{width: '100%', height: '100%'}}>
                  <View style = { styles.scrollViewHolder }>
                    <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Active</Text>
                        <ScrollView>
                          {activeTasks}
                        </ScrollView>                      
                      </View>
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Late</Text>
                        <ScrollView>
                          {lateTasks}
                        </ScrollView>                      
                      </View>                 
                      <View style = { [styles.item, {width: screenWidth/1.5} ]}>
                        <Text style= { styles.headCard} >Done</Text>
                        <ScrollView>
                          {doneTasks}
                        </ScrollView>                      
                      </View>                             
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
              {/* <ScrollView style={styles.scrollContainer}>
                  {tasks}
              </ScrollView> */}
              <TouchableOpacity onPress={ () => this.addtask(navigate) } style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
          </View>
      );
  }
  addtask(navigate){
    navigate('CreateTask')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detailTaskMethod: (navigate, val) => {
      dispatch({ type: 'ADD_ID_TASK_STATE',  
        id: val.id
      })
      navigate('HomeTask')
    },
    lateTask(tasks, taskId, navigate) {
      dispatch({ type: 'LATE_TASK',  
        tasks: tasks, taskId : taskId
      })
      navigate('Project');
    },
    deleteProject: (projects, projectId, navigate) => {
      var timestamp = moment().format();
      projects.map((val, index)=>{
        if( val.id == projectId){
          const i = index
          dispatch({ type: 'DELETE_PROJECT',  
          index: i,
          newfeed : {
            'ProjectName': val.ProjectName,
            'createDate': timestamp,
            'status': 'deleteProject',
          }
        })
        }
      });
      navigate('HomeProject');
    },
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    TaskId: state.TaskId,
    projects: state.projects,
    ProjectId: state.ProjectId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollViewHolder: {
    flex: 1,
  },
  scrollViewHolder:
  { 
    margin: 10,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  item:
  {
    backgroundColor: '#D3D3D3',
    flex: 1,
    padding: 10,
    marginRight: 10,
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
  headCard: {
    fontSize: 17,
    color: '#4A3C39',
    marginBottom: 10,
  },
});
