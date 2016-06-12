/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class zwd51 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.pic} source={{uri: 'https://img.alicdn.com/bao/uploaded/i1/TB1aMZ.JFXXXXb8XFXXXXXXXXXX_!!0-item_pic.jpg'}}/>
        <View style={styles.rightContainer}>
        <Text style={styles.title}>
          薄款无领时尚小西装女韩版修身七分袖夏装白色上衣短款女装短外套
        </Text>
        <Text style={styles.price}>
          价格: 52.00
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  pic: {
    height: 80,
    width: 80
  },
  title: {
    fontSize: 15
  },
  price: {
    color: '#333333'
  }
});

AppRegistry.registerComponent('zwd51', () => zwd51);
