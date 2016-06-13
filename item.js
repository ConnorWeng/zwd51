import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

class Item extends Component {
  render() {
    return (
      <Text>{this.props.data.goodsName}</Text>
    );
  }
}

module.exports = Item;
