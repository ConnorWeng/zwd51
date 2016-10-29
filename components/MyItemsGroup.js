import React, {Component} from 'react';
import {
  StyleSheet,
  View,
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
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default MyItemsGroup;
