import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

class CartPage extends Component {

  render() {
    return (
      <View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state)(CartPage);
