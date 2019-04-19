import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class VoteTimeMeeting extends Component {
    render() {
      return (
          <CheckBox 
            key={this.props.keyVal}
            checkedColor= 'green'
            title= {"Start : "+this.props.startHour[0][this.props.i]+":"+this.props.startMinutes[0][this.props.i]+"    End : "+this.props.endHour[0][this.props.i]+":"+this.props.endMinutes[0][this.props.i]}
            checked={this.props.checked}
            onPress={this.props.selectedTime}
          />
      );
    }
}
const styles = StyleSheet.create({

});