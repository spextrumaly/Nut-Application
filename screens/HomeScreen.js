import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import Project from '../components/Project';
import { store } from '../Store/Store';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        showSelect: false,
        showCreate: false,
        showJoin: false,
        projectText: '',
        projectId: '',
        projectOwner: '',
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
        return <Project key={key} keyval={key} val={val}
        deleteMethod={()=>this.deleteProject(key, val)}
        detailMethod={() => this.detailMethod(navigate, val)}/>
      });
      return (
          <View style={styles.container}>
              <ScrollView style={styles.scrollContainer}>
                {projects}
              </ScrollView>
              {this.state.showSelect == true ? 
                <View style={styles.buttonAdd}>
                  <Button style={styles.buttonAddStyle}
                    onPress={() => this.createproject(navigate)}
                    title="Create Project"
                    color="#E91E63"
                  />
                  <Button style={styles.buttonAddStyle}
                    onPress={this.joinproject.bind(this)}
                    title="Join Project"
                    color="#D3D3D3"
                  />
                </View>
              : null }
              <View style={styles.footerFlex}>
                <TouchableOpacity onPress={ this.addproject.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
          </View>
      );
  }
  addproject(){
    this.setState({showSelect: true});
  }
  createproject(navigate){
    this.setState({showSelect: false});
    navigate('CreateProject')
  }
  joinproject(){
    // this.setState({showJoin: true});
    // this.setState({showSelect: false});
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
    navigate('Project')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollContainer: {
      marginBottom: 210
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
      bottom: 50,
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
  buttonAdd: {
    position: 'absolute',
    zIndex: 11,
    bottom: 130,
    width: 150,
    right: 17,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddStyle: {
    marginBottom: 10,
    backgroundColor: '#E91E63',
  }
});
