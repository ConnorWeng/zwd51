import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import ShopInfo from './ShopInfo';

class ShopPage extends Component {

  render() {
    return (
      <ScrollView>
        <ShopInfo {...this.props.store}/>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({

});

export default ShopPage;
