import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MyItem extends Component {

  render() {
    return (
      <TouchableHighlight onPress={() => {}} underlayColor="#f0f0f0">
        <View style={styles.bodyItemContainer}>
          <Icon name={this.props.iconName} size={30} color="#000000" />
          <Text style={styles.bodyItemTitle}>{this.props.title}</Text>
          <Icon style={styles.bodyItemArrow} name="ios-arrow-forward-outline" size={30} color="#000000" />
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  bodyItemContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  bodyItemTitle: {
    flex: 8,
    marginLeft: 20,
    fontSize: 16,
    color: '#000000'
  },
  bodyItemArrow: {
    flex: 1
  }
});

export default MyItem;
