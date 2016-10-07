import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  ProgressBarAndroid,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {getGoods} from '../actions';

const {height, width} = Dimensions.get('window');

class ItemList extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource,
      goods: dataSource.cloneWithRows(props.goods),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      ToastAndroid.show(nextProps.message, ToastAndroid.SHORT);
    } else {
      this.setState({
        goods: this.state.dataSource.cloneWithRows(nextProps.goods),
      });
    }
  }

  render() {
    return (
      <PullToRefreshListView
         ref="pullToRefreshListView"
         contentContainerStyle={styles.itemContainer}
         dataSource={this.state.goods}
         viewType={PullToRefreshListView.constants.viewType.listView}
         style={styles.goodsListView}
         initialListSize={20}
         enableEmptySections={true}
         pageSize={20}
         renderRow={this.renderItem.bind(this)}
         renderHeader={this.renderHeader.bind(this)}
         renderFooter={this.renderFooter.bind(this)}
         onRefresh={this.onRefresh.bind(this)}
         onLoadMore={this.onLoadMore.bind(this)}
         pullUpDistance={35}
         pullUpStayDistance={50}
         pullDownDistance={35}
         pullDownStayDistance={50}/>
    );
  }

  renderItem(item) {
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

  renderHeader(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case refresh_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull down to refresh</Text>
        </View>
      );
    case refresh_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull down to refresh{pullDistancePercent}%</Text>
        </View>
      );
    case will_refresh:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>release to refresh{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
        </View>
      );
    case refreshing:
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          {this.renderActivityIndicator()}<Text>refreshing</Text>
        </View>
      );
    }
  }

  renderFooter(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case load_more_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull up to load more</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull up to load more{pullDistancePercent}%</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
        </View>
      );
    case loading_more:
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          {this.renderActivityIndicator()}<Text>loading</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>no more</Text>
        </View>
      );
    }
  }

  renderActivityIndicator() {
    return ActivityIndicator ? (
      <ActivityIndicator
         style={{marginRight: 10,}}
         animating={true}
         color={'#ff0000'}
         size={'small'}/>
    ) : (
      <ProgressBarAndroid
         style={{marginRight: 10,}}
         color={'#ff0000'}
         styleAttr={'Small'}/>
    );
  }

  onRefresh() {
    this.refs.pullToRefreshListView.endRefresh(true);
  }

  onLoadMore() {
    this.props.getGoods(this.props.shopId, this.props.page);
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

export default connect(state => state.good, actions)(ItemList);