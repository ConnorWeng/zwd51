import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {mapDispatchToProps} from '../actions/mapper';
import Loading from './Loading';
import {PAGE_SIZE} from '../service.json';

const {height, width} = Dimensions.get('window');

class CategoryItemsPage extends Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  async componentDidMount() {
    await this.props.clearGoodsInCate();
    this.onLoadMore();
  }

  componentWillReceiveProps(nextProps) {
    this.refs.pullToRefreshListView.endLoadMore(nextProps.good.getGoodsInCateRequest.isEnd);
  }

  render() {
    if (this.props.good.getGoodsInCateRequest.message) {
      ToastAndroid.show(this.props.good.getGoodsInCateRequest.message, ToastAndroid.SHORT);
    }

    return (
      <View style={{flex: 1}}>
        <PullToRefreshListView
           ref="pullToRefreshListView"
           contentContainerStyle={styles.itemContainer}
           dataSource={this.dataSource.cloneWithRows(this.props.good.getGoodsInCateRequest.data)}
           viewType={PullToRefreshListView.constants.viewType.listView}
           style={styles.goodsListView}
           initialListSize={PAGE_SIZE}
           enableEmptySections={true}
           pageSize={PAGE_SIZE}
           renderRow={this.renderItem.bind(this)}
           renderHeader={this.renderHeader.bind(this)}
           renderFooter={this.renderFooter.bind(this)}
           onRefresh={this.onRefresh.bind(this)}
           onLoadMore={this.onLoadMore.bind(this)}
           enabledPullDown={false}
           pullUpDistance={35}
           pullUpStayDistance={50}/>
      </View>
    );
  }

  renderItem(item) {
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

  renderHeader(viewState) {
    return (
      <View style={{width: width}}></View>
    );
  }

  renderFooter(viewState) {
    if (this.props.good.getGoodsInCateRequest.isLoading) {
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Loading/>
          <Text>加载中...</Text>
        </View>
      );
    }
    let {pullState, pullDistancePercent} = viewState;
    const {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case load_more_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>放开加载更多</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>没有更多了</Text>
        </View>
      );
    }

  }

  onRefresh() {
    this.refs.pullToRefreshListView.endRefresh(true);
  }

  onLoadMore() {
    this.props.getGoodsInCate(this.props.cate_id, this.props.good.getGoodsInCateRequest.page);
  }

}

const styles = StyleSheet.create({
  goodsListView: {
    height: height - 10 - 65 - 10,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
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
