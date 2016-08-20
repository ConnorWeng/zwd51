import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

class TouchableContainerItemsGroup extends Component {

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
  },
});

export default TouchableContainerItemsGroup;
