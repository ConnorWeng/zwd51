import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ProgressBarAndroid
} from 'react-native';

class Loading extends Component {

  render() {
    return (
      <ProgressBarAndroid
         style={[styles.loading, this.props.style]}
         color={'#ff0000'}
         styleAttr={'Small'}/>
    );
  }

}

const styles = StyleSheet.create({
  loading: {
  },
});

export default Loading;
