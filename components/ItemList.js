import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Loading from './Loading';
import {getGoods} from '../actions';
import {PAGE_SIZE} from '../service.json';

const {height, width} = Dimensions.get('window');

class ItemList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onLoadMore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getGoodsRequest.message) {
      ToastAndroid.show(nextProps.getGoodsRequest.message, ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <FlatList
         ref="flatList"
         style={styles.goodsListView}
         horizontal={false}
         numColumns={2}
         columnWrapperStyle={styles.itemContainer}
         keyExtractor={this.keyExtractor.bind(this)}
         ListFooterComponent={this.renderFooter.bind(this)}
         renderItem={this.renderItem.bind(this)}
         data={this.props.getGoodsRequest.data}
         onEndReached={this.onLoadMore.bind(this)}
         onEndReachedThreshold={0.01}/>
    );
  }

  keyExtractor(item, index) {
    return item.goods_id;
  }

  renderItem({item}) {
    return (
      <TouchableHighlight style={styles.item} onPress={() => this.props.navigator.push({ItemPage: true, item: item})}>
        <View>
          <Image source={{uri: item.default_image}} style={styles.itemImage}/>
          <View style={styles.itemTitleContainer}>
            <Text numberOfLines={2} style={styles.itemTitle}>{item.goods_name}</Text>
          </View>
          <View style={styles.itemPriceContainer}>
            <Text numberOfLines={1} style={styles.itemPrice}>¥ {item.price} </Text>
            <Text style={styles.itemOriginPrice}>¥ {item.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderFooter() {
    if (this.props.getGoodsRequest.isEnd) {
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>没有更多了</Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Loading/>
          <Text>加载中...</Text>
        </View>
      );
    }
  }

  onLoadMore() {
    this.props.getGoods(this.props.shopId, this.props.getGoodsRequest.page);
  }

}

const actions = (dispatch) => {
  return {
    getGoods: (storeId, page) => dispatch(getGoods(storeId, page)),
  };
};

const styles = StyleSheet.create({
  goodsListView: {
    marginTop: 10,
    height: height - 10 - 65 - 10 - 30,
  },
  itemContainer: {
    justifyContent: 'space-between',
  },
  item: {
    width: width / 2 - 2.5,
    paddingBottom: 5,
  },
  itemImage: {
    width: width / 2 - 2.5,
    height: 200,
    resizeMode: 'cover',
  },
  itemTitleContainer: {
    width: width / 2 - 2.5,
    backgroundColor: '#ffffff',
  },
  itemTitle: {
    fontSize: 12,
    color: '#000000',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  },
  itemPrice: {
    color: '#f40',
  },
  itemOriginPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});

export default connect(state => state.good, actions)(ItemList);
