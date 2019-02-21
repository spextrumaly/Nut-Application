import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class Task extends Component {
    render() {
      return (
          <CheckBox 
            key={this.props.keyval}
            checkedColor= 'green'
            title= {this.props.val.checkListName}
            checked={this.props.val.checked}
            onPress={this.props.checkBoxMethod}
          />
      );
    }
}
const styles = StyleSheet.create({

});