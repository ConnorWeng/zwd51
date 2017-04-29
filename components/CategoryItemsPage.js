import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../actions/mapper';
import Loading from './Loading';
import {PAGE_SIZE} from '../service.json';

const {height, width} = Dimensions.get('window');

class CategoryItemsPage extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.clearGoodsInCate();
    this.onLoadMore();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
           ref="FlatList"
           style={styles.goodsListView}
           horizontal={false}
           numColumns={2}
           columnWrapperStyle={styles.itemContainer}
           keyExtractor={this.keyExtractor.bind(this)}
           ListFooterComponent={this.renderFooter.bind(this)}
           renderItem={this.renderItem.bind(this)}
           data={this.props.good.getGoodsInCateRequest.data}
           onEndReached={this.onLoadMore.bind(this)}
           onEndReachedThreshold={0.01}/>
      </View>
    );
  }

  keyExtractor(item, index) {
    return item.goods_id;
  }

  renderItem({item}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.props.navigator.push({ItemPage: true, item: item})}>
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
      </TouchableOpacity>
    );
  }

  renderFooter() {
    if (this.props.good.getGoodsInCateRequest.isEnd) {
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
    this.props.getGoodsInCate(this.props.cate_id, this.props.good.getGoodsInCateRequest.page).then((json) => {
      if (json.error) {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    });
  }

}

const styles = StyleSheet.create({
  goodsListView: {
    height: height - 10 - 65 - 10,
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

export default connect(state => state, mapDispatchToProps)(CategoryItemsPage);
