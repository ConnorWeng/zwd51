import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import OrderHead from './OrderHead';

class OrderInfoPage extends Component {

  render() {
    return (
      <OrderHead orderSn={this.props.orderSn} orderStatus={this.props.orderStatus}/>
    );
  }

}

const styles = StyleSheet.create({

});

export default OrderInfoPage;
