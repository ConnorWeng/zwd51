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
           style={styles.loading}
           color={'#ff0000'}
           styleAttr={'Small'}/>
    );
  }

}

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
  },
});

export default Loading;
