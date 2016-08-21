import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class PrimaryButton extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.button} {...this.props}>
        <Text style={styles.buttonText}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    height: 42,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: '#f40',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
  },
});

export default PrimaryButton;
