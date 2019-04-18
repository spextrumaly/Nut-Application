import React from 'react';
import * as Animatable from 'react-native-animatable';
import AwesomeButton from "react-native-really-awesome-button";
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

const showAnimation = "slideInUp"
const hideAnimation = "slideOutDown"
class HomeProjectScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
        showSelect: false,
        showCreate: false,
        showJoin: false,
        anim: false
    };
  }
  componentWillMount() {
    this.animatedValueAdd = new Animated.Value(0);
  }
  render() {
      console.log("Project : ", this.props.projects)
      const {navigate} = this.props.navigation;
      let projects = this.props.projects.map((val, key)=>{
          return <Project key={key} keyval={key} val={val}
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
              <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} >
                  <AwesomeButton 
                    style={styles.createBtnAnimate}
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    width={170}
                    borderRadius={30}
                    onPress= {() => {this.props.navigation.navigate('CreateProject'); this.setState({showSelect: false}); this.setState({anim: false});}}
                    >
                    <Text style={styles.signUpText}>Create Project</Text>
                  </AwesomeButton>
                </Animatable.View>
              </Animatable.View>
              <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                <Animatable.View animation={this.state.anim ? showAnimation : hideAnimation} >
                  <AwesomeButton 
                    style={styles.joinBtnAnimate}
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    width={170}
                    borderRadius={30}
                    onPress= {() => {this.props.navigation.navigate('JoinProject'); this.setState({showSelect: false}); this.setState({anim: false});}}
                    >
                    <Text style={styles.signUpText}>Join Project</Text>
                  </AwesomeButton>
                </Animatable.View>
              </Animatable.View>
              </View>
              : null }
              <View style={styles.footerFlex}>
                <Animatable.View animation='pulse' easing="ease-out" iterationCount="infinite">
                  <AwesomeButton 
                    backgroundDarker='#372c2a'
                    backgroundColor='#4A3C39'
                    borderRadius={100}
                    paddingTop={10}
                    paddingBottom={10}
                    paddingHorizontal={10}
                    width={80}
                    onPress={ this.addproject.bind(this)} 
                    style={styles.addButton}>
                    <Text style={styles.addButtonText}>{!this.state.anim ? '+' : 'x'}</Text>
                  </AwesomeButton>
                </Animatable.View>
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
        this.setState({anim: false});
        setTimeout(() => this.setState({
          showSelect: false
      }), 500)
      })
    } else {
      Animated.timing(this.animatedValueAdd, {
        toValue: 1,
        duration: 200
      }).start(() => {
        this.setState({showSelect: true});
        this.setState({anim: true});
      })
    }
  }
}

function mapStateToProps(state) {
  return {
      projects: state.projects,
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
    // marginBottom: 100
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
      borderTopColor: '#ededed',
      fontFamily: 'Kanit-Regular'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 20,
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 40,
      fontFamily: 'Kanit-Regular'
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
    position: 'absolute',
    zIndex: 11,
    bottom: 100,
    right: -60,
  },
  joinBtnAnimate: {
    position: 'absolute',
    zIndex: 11,
    bottom: 25,
    right: -60,

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
    fontFamily: 'Kanit-Regular'
  },
  task: {
    position: 'relative',
    padding: 15,
    paddingTop: 40,    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4A3C39",
  },
  inputIcon:{
    width:30,
    height:30,
    margin:5,
    justifyContent: 'center'
  },
  taskText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Kanit-Bold',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#f5f5dc'
  },
});
