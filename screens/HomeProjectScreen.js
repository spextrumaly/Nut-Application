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
  Image
} from 'react-native';
import Project from '../components/Project';
import { store } from '../Store/Store';

export default class HomeProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
        showSelect: false,
        showCreate: false,
        showJoin: false,
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
      let projects = store.projectArray.map((val, key)=>{
        if(val.status == 'join')
          return <Project key={key} keyval={key} val={val}
          deleteMethod={()=>this.deleteProject(key, val)}
          detailMethod={() => this.detailMethod(navigate, val)}
          />
      });
      return (
          <View style={styles.container}>
            <View key={this.props.keyval} style={styles.task}>
              <Image style={styles.inputIcon} source={require('../assets/images/icon.png')}/>
              <View>
                <Text style={styles.taskText}>Projects</Text>
              </View>
            </View>
            <View style={styles.body}>
              <ScrollView style={styles.scrollContainer}>
              <View style={styles.projectContainer}>
                {projects}
              </View>
              </ScrollView>
              {this.state.showSelect == true ? 
                <View style={styles.buttonAdd}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.createproject(navigate)}
                  >
                  <Text style={styles.signUpText}>Create Project</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.joinproject(navigate)}
                  >
                  <Text style={styles.signUpText}>Join Project</Text>
                  </TouchableHighlight>
                </View>
              : null }
              <View style={styles.footerFlex}>
                <TouchableOpacity onPress={ this.addproject.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      );
  }
  addproject(){
    if(this.state.showSelect == true) {
      this.setState({showSelect: false});
    } else {
      this.setState({showSelect: true});
    }
  }
  createproject(navigate){
    this.setState({showSelect: false});
    navigate('CreateProject')
  }
  joinproject(navigate){
    this.setState({showSelect: false});
    navigate('JoinProject')
  }
  deleteProject(key, value){
      store.projectArray.splice(key, 1);
      store.taskArray.map((val, key)=>{
        if( val.ProjectName == value.ProjectName)
          store.taskArray.splice(key, 1);
      });
      this.setState({projectArray: this.state.projectArray});
  }
  detailMethod(navigate, val){
    store.ProjectName = val.ProjectName;
    store.ProjectId = val.id;
    navigate('Project')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    marginBottom: 100
  },
  body: {
    backgroundColor: '#DCDCDC',
    flex: 1,
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
