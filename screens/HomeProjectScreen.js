import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Button,
  Image
} from 'react-native';
import Project from '../components/Project';
import { connect } from 'react-redux'

class HomeProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.handlePressInCreate = this.handlePressInCreate.bind(this);
    this.handlePressOutCreate = this.handlePressOutCreate.bind(this);
    this.handlePressInJoin = this.handlePressInJoin.bind(this);
    this.handlePressOutJoin = this.handlePressOutJoin.bind(this);
    this.state = {
        showSelect: false,
        showCreate: false,
        showJoin: false,
    };
  }
  componentWillMount() {
    this.animatedValueCreate = new Animated.Value(1);
    this.animatedValueJoin = new Animated.Value(1);
    this.animatedValueAdd = new Animated.Value(0);
  }
  handlePressInCreate() {
    Animated.spring(this.animatedValueCreate, {
      toValue: .75
    }).start()
  }
  handlePressOutCreate(navigate) {
    Animated.spring(this.animatedValueCreate, {
      toValue: 1,
    }).start(() => {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start()
      this.setState({showSelect: false});
      navigate('CreateProject')
    })
  }
  handlePressInJoin() {
    Animated.spring(this.animatedValueJoin, {
      toValue: .75
    }).start()
  }
  handlePressOutJoin(navigate) {
    Animated.spring(this.animatedValueJoin, {
      toValue: 1,
    }).start(() => {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start()
      this.setState({showSelect: false});
      navigate('JoinProject')
    })

  }
  render() {
      const {navigate} = this.props.navigation;
      const interpolateRotation = this.animatedValueAdd.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
      })
      const animatedStyleAdd = {
        transform: [
          { rotate: interpolateRotation }
        ]
      }
      const animatedStyleCreate = {
        transform: [{ scale: this.animatedValueCreate}]
      }
      const animatedStyleJoin = {
        transform: [{ scale: this.animatedValueJoin}]
      }
      let projects = this.props.projects.map((val, key)=>{
        if(val.status == 'join')
          return <Project key={key} keyval={key} val={val}
          deleteMethod={()=>this.deleteProject(key, val)}
          detailMethod={() => this.props.detailMethod(navigate, val)}
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
                <TouchableWithoutFeedback
                  onPressIn={this.handlePressInCreate}
                  onPressOut={() => this.handlePressOutCreate(navigate)}
                >
                  <Animated.View style={[styles.createBtnAnimate, animatedStyleCreate]}>
                    <Text style={styles.signUpText}>Create Project</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPressIn={this.handlePressInJoin}
                  onPressOut={() => this.handlePressOutJoin(navigate)}
                >
                  <Animated.View style={[styles.joinBtnAnimate, animatedStyleJoin]}>
                    <Text style={styles.signUpText}>Join Project</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
              : null }
              <View style={styles.footerFlex}>
                <TouchableOpacity onPress={ this.addproject.bind(this) } style={styles.addButton}>
                  <Animated.View style={animatedStyleAdd}>
                    <Text style={styles.addButtonText}>+</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      );
  }

  addproject(){
    if(this.state.showSelect == true) {
      Animated.timing(this.animatedValueAdd, {
        toValue: 0,
        duration: 200
      }).start(() => {
        this.setState({showSelect: false});
      })
    } else {
      Animated.timing(this.animatedValueAdd, {
        toValue: 1,
        duration: 200
      }).start(() => {
        this.setState({showSelect: true});
      })
    }
  }
}

function mapStateToProps(state) {
  return {
      projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detailMethod: (navigate, val) => {
      dispatch({ type: 'DETAIL_PROJECT',  
        id: val.id
      })
      navigate('Project')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProjectScreen)


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
    bottom: 60,
    width: 150,
    right: 17,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnAnimate: {
    backgroundColor: "#4A3C39",
    position: 'absolute',
    zIndex: 11,
    bottom: 120,
    width: 150,
    right: 17,
    borderRadius:30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnAnimate: {
    backgroundColor: "#4A3C39",
    position: 'absolute',
    zIndex: 11,
    bottom: 50,
    width: 150,
    right: 17,
    borderRadius:30,
    height: 50,
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
