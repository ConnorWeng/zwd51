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
import {clearShopGoods} from  '../actions';

class ShopPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.clearShopGoods();
  }

  render() {
    return (
      <View style={styles.container}>
        <ShopInfo {...this.props.shop}/>
        <ItemList shopId={this.props.shop.store_id} navigator={this.props.navigator}/>
      </View>
    );
  }

}

const actions = (dispatch) => {
  return {
    clearShopGoods: () => dispatch(clearShopGoods()),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default connect(state => state.good, actions)(ShopPage);
