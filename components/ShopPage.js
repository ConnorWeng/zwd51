import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import ShopInfo from './ShopInfo';
import ItemList from './ItemList';

class ShopPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ShopInfo {...this.props.shop}/>
        <ItemList shopId={this.props.shop.store_id} navigator={this.props.navigator}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({

});

export default ShopPage;
