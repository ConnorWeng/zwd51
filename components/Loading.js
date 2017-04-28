import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

class Loading extends Component {

  render() {
    return (
      <ActivityIndicator
         style={[styles.loading, this.props.style]}
         color={'#ff0000'}
         size={'small'}/>
    );
  }

}

const styles = StyleSheet.create({
  loading: {
  },
});

export default Loading;
