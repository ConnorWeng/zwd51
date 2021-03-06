import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ListView,
  Dimensions,
  Platform,
  ActivityIndicator,
  Text,
  Image,
  ToastAndroid,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Loading from './Loading';
import {mapDispatchToProps} from '../actions/mapper';
import {PAGE_SIZE} from '../service.json';

const {height, width} = Dimensions.get('window');

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchGoodsRequest.message) {
      ToastAndroid.show(nextProps.searchGoodsRequest.message, ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput onChangeText={(text) => this.setState({keywords: text})} style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
          </View>
        <TouchableOpacity style={styles.searchFilter} onPress={this.search.bind(this)}>
          <Icon name="ios-search-outline" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryContainer} onPress={() => {this.props.navigator.push({CategoryPage: true})}}>
          <Text style={styles.category}>分类</Text>
        </TouchableOpacity>
        </View>
        {
          this.props.searchGoodsRequest.data.length > 0 ?
            <FlatList
                 ref="flatList"
                 style={styles.goodsListView}
                 horizontal={false}
                 numColumns={2}
                 columnWrapperStyle={styles.itemContainer}
                 keyExtractor={this.keyExtractor.bind(this)}
                 ListFooterComponent={this.renderFooter.bind(this)}
                 renderItem={this.renderItem.bind(this)}
                 data={this.props.searchGoodsRequest.data}
                 onEndReached={this.onLoadMore.bind(this)}
                 onEndReachedThreshold={0.01}/> : null
        }
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
    if (this.props.searchGoodsRequest.isEnd) {
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
    this.props.searchGoods(this.state.keywords, this.props.searchGoodsRequest.page);
  }

  async search() {
    await this.props.clearSearchGoods();
    this.props.searchGoods(this.state.keywords, this.props.searchGoodsRequest.page);
  }

}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
  },
  searchInputContainer: {
    flex: 5,
    height: 35,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  searchFilter: {
    flex: 1,
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 1.2,
    height: 40,
    alignItems: 'center',
  },
  category: {
    color: '#000000',
    fontSize: 20,
  },
  goodsListView: {
    marginTop: 10,
    height: height - 65 - 40 - 42 - 20,
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

export default connect(state => state.good, mapDispatchToProps)(SearchPage);
