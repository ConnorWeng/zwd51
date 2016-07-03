import React, { Component } from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

class ItemPage extends Component {
  render() {
    return (
      <View>
        <Image style={styles.pic} source={{uri: this.props.defaultImage}}/>
        <Text>{this.props.goodsName}</Text>
        <Text>{this.props.price}</Text>
        <TouchableHighlight onPress={this.upload.bind(this)}>
          <Text style={styles.uploadFont}>上传</Text>
        </TouchableHighlight>
      </View>
    );
  }

  upload() {
    NativeModules.AlibabaAPI.login();
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

export default ItemPage;
