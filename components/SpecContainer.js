import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class SpecContainer extends Component {

  render() {
    return (
      <View style={styles.specContainer}>
        <View>
          <Text style={styles.specCategory}>{this.props.specName}</Text>
        </View>
        <View style={styles.specCheckboxContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  specContainer: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  specCategory: {
    color: '#000000',
    fontSize: 16,
  },
  specCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default SpecContainer;
