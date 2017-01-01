import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {mapDispatchToProps} from '../actions/mapper';
import ItemList from './ItemList2';

class CategoryItemsPage extends Component {

  async componentDidMount() {
    await this.props.clearGoodsInCate();
    this.onLoadMore();
  }

  render() {
    if (this.props.good.getGoodsInCateRequest.message) {
      ToastAndroid.show(this.props.good.getGoodsInCateRequest.message, ToastAndroid.SHORT);
    }

    return (
      <View>
        <ItemList data={this.props.good.getGoodsInCateRequest.data} isEnd={this.props.good.getGoodsInCateRequest.isEnd} navigator={this.props.navigator} onLoadMore={this.onLoadMore.bind(this)}/>
        <Spinner visible={this.props.good.getGoodsInCateRequest.isLoading}/>
      </View>
    );
  }

  onLoadMore() {
    this.props.getGoodsInCate(this.props.cate_id, this.props.good.getGoodsInCateRequest.page);
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(CategoryItemsPage);
