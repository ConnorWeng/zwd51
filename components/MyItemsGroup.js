import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

class MyItemsGroup extends Component {

  render() {
    return (
      <View style={styles.bodyContainer}>
        {this.props.children}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  }
});

export default MyItemsGroup;
