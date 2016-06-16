import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

class Item extends Component {
  render() {
    return (
      <View>
        <Image style={styles.pic} source={{uri: this.props.data.defaultImage}}/>
        <Text>{this.props.data.goodsName}</Text>
        <Text>{this.props.data.price}</Text>
        <TouchableHighlight onPress={this.upload.bind(this)}>
          <Text style={styles.uploadFont}>上传</Text>
        </TouchableHighlight>
      </View>
    );
  }

  upload() {

  }
}

const styles = StyleSheet.create({
  pic: {
    width: 200,
    height: 200
  },
  uploadFont: {
    fontSize: 20
  }
});

module.exports = Item;
