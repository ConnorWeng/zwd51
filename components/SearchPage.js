import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Dimensions,
  Platform,
  ActivityIndicator,
  ProgressBarAndroid,
  Text,
  Image,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import Spinner from 'react-native-loading-spinner-overlay';
import {searchGoods, clearSearchGoods} from '../actions';

const {height, width} = Dimensions.get('window');

class SearchPage extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      keywords: '',
      dataSource: dataSource,
      searchGoods: dataSource.cloneWithRows(props.searchGoods),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      ToastAndroid.show(nextProps.message, ToastAndroid.SHORT);
    } else {
      this.setState({
        searchGoods: this.state.dataSource.cloneWithRows(nextProps.searchGoods),
      });
    }
    if (this.refs.pullToRefreshListView) {
      this.refs.pullToRefreshListView.endLoadMore(this.props.searchEnd);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput onChangeText={(text) => this.setState({keywords: text})} style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
          </View>
        <TouchableOpacity style={styles.searchFilter} onPress={this.search.bind(this)}>
          <Icon name="ios-search-outline" size={30} color="#000000" />
        </TouchableOpacity>
        </View>
        {
          this.props.searchGoods.length > 0 ?
            <PullToRefreshListView
                 ref="pullToRefreshListView"
                 contentContainerStyle={styles.itemContainer}
                 dataSource={this.state.searchGoods}
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
                 enabledPullDown={false}
                 pullUpDistance={35}
                 pullUpStayDistance={50}/> : null
        }
        <Spinner visible={this.props.isSearching}/>
      </View>
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
    return (
      <View style={{width: width}}></View>
    );
  }

  renderFooter(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case load_more_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>放开加载更多</Text>
        </View>
      );
    case loading_more:
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          {this.renderActivityIndicator()}<Text>加载中...</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>没有更多了</Text>
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
    this.props.search(this.state.keywords, this.props.searchPage);
  }

  search() {
    this.props.clearSearchGoods();
    this.props.search(this.state.keywords, this.props.searchPage);
  }

}

const actions = (dispatch) => {
  return {
    search: (keywords, page) => dispatch(searchGoods(keywords, page)),
    clearSearchGoods: () => dispatch(clearSearchGoods()),
  };
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
  goodsListView: {
    marginTop: 10,
    height: height - 65 - 40 - 42 - 20,
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

export default connect(state => state.good, actions)(SearchPage);
