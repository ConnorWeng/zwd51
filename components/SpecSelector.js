import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class SpecSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  render() {
    return (
      <View style={styles.specContainer}>
        <View>
          <Text style={styles.specCategory}>{this.props.category}</Text>
        </View>
        <View style={styles.specCheckboxContainer}>
          {
            this.props.specs.map((spec) => {
              let checked = {};
              if (this.state.selected === spec) {
                checked = styles.checked;
              }
              return (
                <TouchableOpacity key={spec} style={[styles.specCheckbox, checked]} onPress={() => {
                    this.setState({
                      selected: spec,
                    });
                  }}>
                  <Text>{spec}</Text>
                </TouchableOpacity>
              );
            })
          }
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
    marginTop: 5,
    marginBottom: 5,
  },
  specCheckbox: {
    marginRight: 5,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  checked: {
    backgroundColor: '#f40',
  },
});

export default SpecSelector;
