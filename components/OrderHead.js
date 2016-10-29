import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import STATUS from '../status.json';

class OrderHead extends Component {

  render() {
    return (
      <View style={styles.orderHeadContainer}>
        <Text style={styles.orderSn}>订单号：{this.props.orderSn}</Text>
        <Text style={styles.orderStatus}>{STATUS[this.props.orderStatus]}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  orderHeadContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderSn: {
    color: '#000000',
  },
  orderStatus: {
    color: '#f40',
  },
});

export default OrderHead;
