import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MultiSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  render() {
    const childrenArray = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    const children = childrenArray.map((child, i) => {
      return (
        <TouchableOpacity onPress={() => {this.setState({selected: Math.pow(2, i) ^ this.state.selected})}}>
          <View style={styles.itemContainer}>
            <View style={styles.bodyContainer}>
              {child}
            </View>
            <View style={styles.checkboxContainer}>
              {(Math.pow(2, i) & this.state.selected) > 0 ? <Icon style={styles.checkbox} name="ios-checkbox-outline" size={30} color="rgb(0,200,0)" /> : null}
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }

  getSelected() {
    const selected = [];
    this.props.children.forEach((child, i) => {
      if ((Math.pow(2, i) & this.state.selected) > 0) {
        selected.push(child.props.value);
      }
    });
    return selected;
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  bodyContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  checkboxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  checkbox: {
    flex: 1,
  },
});

export default MultiSelect;
