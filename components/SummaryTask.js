import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Task extends Component {
    render() {
        return (
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View key={this.props.keyval} style={styles.cardContainer}>
                <View style={styles.taskText}>
                  <Text style={styles.headText}>{this.props.val.task}</Text>
                  <Text style={styles.titleText}>{this.props.val.description}</Text>
                  <Text style={styles.ownerText}>{this.props.val.ownerName}</Text>
                  <Text style={styles.dlText}>Task Deadline | {this.props.val.deadlineDate}</Text>
                </View>
            </View>
            {
              this.props.type == 'active' ? <View style={styles.colorContainer}></View> : null
            }
            {
              this.props.type == 'late' ? <View style={styles.colorContainerLate}></View> : null
            }
            {
              this.props.type == 'done' ? <View style={styles.colorContainerDone}></View> : null
            }
          </View>
        );
    }
}
const styles = StyleSheet.create({
  task: {
    position: 'relative',
    padding: 10,
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#f5f5dc',
    borderRadius: 10,
  },
  peopleIcon:{
    width:15,
    height:15,
    margin:3,
  },
  containerPeople: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  taskText: {
    padding: 5,
    fontSize: 10,
    color: '#4A3C39',
    fontFamily: 'Kanit-Regular'
  },
  titleText: {
    fontSize: 15,
    color: '#4a3c39',
    opacity: 0.8,
    fontFamily: 'Kanit-Medium'
  },
  dlText: {
    fontSize: 17,
    color: '#fc3158',
    fontFamily: 'Kanit-Medium'
  },
  ownerText: {
    fontSize: 10,
    color: '#4a3c39',
    opacity: 0.8,
    fontFamily: 'Kanit-Italic',
    marginBottom: 5
  },
  headText: {
    fontSize: 23,
    marginTop: -5,
    color: '#4a3c39',
    fontFamily: 'Kanit-Medium'
  },
  colorContainer: {
    width: '30%',
    flexDirection: 'column',
    padding: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth:1,
    borderBottomColor: '#53d769',
    borderTopWidth:1,
    borderTopColor: '#53d769',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#53d769',
  },
  colorContainerLate: {
    width: '30%',
    flexDirection: 'column',
    padding: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth:1,
    borderBottomColor: '#fc3158',
    borderTopWidth:1,
    borderTopColor: '#fc3158',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#fc3158',
  },
  colorContainerDone: {
    width: '30%',
    flexDirection: 'column',
    padding: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth:1,
    borderBottomColor: '#147efb',
    borderTopWidth:1,
    borderTopColor: '#147efb',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#147efb',
  },
  cardContainer: {
    width: '70%',
    flexDirection: 'column',
    padding: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomWidth:1,
    borderBottomColor: '#fff',
    borderTopWidth:1,
    borderTopColor: '#fff',
    marginLeft: 0,
    shadowColor: '#696969',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#fff',
  },
});