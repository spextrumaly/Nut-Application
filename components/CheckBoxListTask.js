import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class Task extends Component {
    render() {
      console.log("CheckBox")
      return (
          <CheckBox 
            key={this.props.keyval}
            checkedColor= 'green'
            title= {this.props.val.name}
            checked={this.props.val.checked}
            onPress={this.props.checkBoxMethod}
          />
      );
    }
}
const styles = StyleSheet.create({

});