import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  TextInput,
  TouchableOpacity,
  Text,
  DrawerLayoutAndroid,
  ActivityIndicator,
  ProgressBarAndroid,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerEnhance from 'react-native-smart-timer-enhance';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import Spinner from 'react-native-loading-spinner-overlay';
import ShopInfo from './ShopInfo';
import SpecSelector from './SpecSelector';
import {getShops, changeMkId} from '../actions';

class MarketPage extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      keywords: '',
      dataSource: dataSource,
      shops: dataSource.cloneWithRows(props.getShopsRequest.data),
    };
  }

  componentDidMount() {
    if (this.props.getShopsRequest.data.length === 0) {
      this.onLoadMore();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getShopsRequest.message) {
      ToastAndroid.show(nextProps.getShopsRequest.message, ToastAndroid.SHORT);
    } else {
      this.setState({
        shops: this.state.dataSource.cloneWithRows(nextProps.getShopsRequest.data),
      });
    }
    if (this.refs.pullToRefreshListView) {
      this.refs.pullToRefreshListView.endLoadMore(nextProps.getShopsRequest.isEnd);
    }
  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SpecSelector ref="markets" category="市场" specs={[{label: '全部', value: 0}, {label: '国投', value: 130}, {label: '国大', value: 8}, {label: '大西豪', value: 4}, {label: '富丽', value: 2}, {label: '佰润', value: 6}, {label: '女人街', value: 3}, {label: '金纱', value: 255}, {label: '非凡', value: 12}, {label: '大时代', value: 10}, {label: '宝华', value: 5}, {label: '柏美', value: 9}, {label: '新金马', value: 45}, {label: '西街', value: 15}, {label: '欣欣', value: 251}, {label: '跨客城', value: 999}, {label: '新百佳', value: 22}, {label: '新旺角', value: 268}, {label: '新潮都', value: 11}, {label: '十三行', value: 14}, {label: '广控', value: 237}, {label: '鞋城', value: 18}, {label: '大西豪三晟', value: 277}, {label: '机筑巷', value: 53}, {label: '圣迦', value: 261}, {label: '景叶', value: 359}, {label: '南城', value: 16}, {label: '万佳', value: 20}, {label: '益民', value: 21}, {label: '富壹', value: 55}, {label: '北城', value: 139}, {label: '西苑鞋汇', value: 57}, {label: '金马实体', value: 151}, {label: '新塘牛仔城', value: 137}, {label: '沙河周边', value: 58}, {label: '其他', value: 56}, {label: '其他城市', value: 535},]}/>
        <View style={styles.itemActionContainer}>
        <TouchableOpacity onPress={this.onConfirm.bind(this)} style={[styles.itemAction, {borderColor: 'rgba(0,0,0,0.1)', backgroundColor: '#f40'}]}>
          <Text style={[styles.itemActionText, {color: '#fff'}]}>确定</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid
         ref="drawerLayout"
         drawerWidth={300}
         drawerPosition={DrawerLayoutAndroid.positions.Right}
         renderNavigationView={() => navigationView}>
        <View>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput onChangeText={(text) => this.setState({keywords: text})} style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
            </View>
            <TouchableOpacity style={styles.searchFilter} onPress={this.search.bind(this)}>
              <Icon name="ios-search-outline" size={30} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchFilter} onPress={() => {this.refs.drawerLayout.openDrawer();}}>
              <Icon name="ios-funnel-outline" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
          <PullToRefreshListView
             ref="pullToRefreshListView"
             style={styles.shopListView}
             dataSource={this.state.shops}
             viewType={PullToRefreshListView.constants.viewType.listView}
             renderRow={this.renderShop.bind(this)}
             renderFooter={this.renderFooter.bind(this)}
             onRefresh={this.onRefresh.bind(this)}
             onLoadMore={this.onLoadMore.bind(this)}
             enabledPullDown={true}
             pullUpDistance={35}
             pullUpStayDistance={50}
             initialListSize={25}
             pageSize={25}/>
        </View>
        <Spinner visible={this.props.getShopsRequest.isLoading}/>
      </DrawerLayoutAndroid>
    );
  }

  renderShop(shop) {
    return (
      <TouchableOpacity onPress={() => { this.props.navigator.push({ShopPage: true, shop: shop}); }}>
        <ShopInfo {...shop} />
      </TouchableOpacity>
    );
  }

  renderFooter(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    const {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case load_more_none:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center',}}>
          <Text>放开加载更多</Text>
        </View>
      );
    case loading_more:
      return (
        <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center',}}>
          {this.renderActivityIndicator()}<Text>加载中...</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center',}}>
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
    this.props.getShops(this.props.mkId, this.state.keywords, this.props.getShopsRequest.page);
  }

  search() {
    this.props.changeMkId(this.refs.markets.getSelected());
    this.props.getShops(this.props.mkId, this.state.keywords, this.props.getShopsRequest.page);
  }

  onConfirm() {
    this.refs.drawerLayout.closeDrawer();
    this.refs.pullToRefreshListView.endLoadMore();
    this.props.changeMkId(this.refs.markets.getSelected());
  }

}

const actions = (dispatch) => {
  return {
    getShops: (mkId, keywords, page) => dispatch(getShops(mkId, keywords, page)),
    changeMkId: (mkId) => dispatch(changeMkId(mkId)),
  };
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  itemActionContainer: {
    flexDirection: 'row',
    width: 300,
    height: 42,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  itemAction: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  itemActionText: {
    textAlign: 'center',
    fontSize: 24,
  },
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
  shopListView: {
    height: height-56-40-42-18, // window height - toolbar - search container - tabbar - margin
  },
  shopBusinessScope: {
  },
});

const MOCKED_DATA = {
  stores: [{
    storeName: '艾上乐品',
    address: '宝华 3F-320-B',
    seePrice: '减20',
    businessScope: '连衣裙',
  }, {
    storeName: '乔蒙网络服饰',
    address: '国投 4F-413-B',
    seePrice: '减20',
    businessScope: '连衣裙 上衣 外贸 欧美',
  }, {
    storeName: '俊衣阁服饰',
    address: '女人街 2F-A19-D1',
    seePrice: '减20',
    businessScope: '女装',
  }, {
    storeName: '小鸟依人服饰',
    address: '国大 4F-431-A',
    seePrice: '减20',
    businessScope: '女装',
  }, {
    storeName: '秀依风尚',
    address: '女人街-E区2F-E226-C',
    seePrice: '减20',
    businessScope: '本档主营：女士精品上衣  蕾丝衫 连衣裙 毛呢外套 羽绒棉服',
  }, {
    storeName: '红荼坊',
    address: '国投 C区-CF1-24A',
    seePrice: '减20',
    businessScope: '女装',
  }, {
    storeName: '睿丽服饰',
    address: '国大-3F-317-A',
    seePrice: '减10',
    businessScope: '连衣裙 衬衫 小西服',
  }, {
    storeName: '九姑娘',
    address: '万佳-3F-6B327',
    seePrice: '减30',
    businessScope: '女装',
  }, {
    storeName: 'e 时代',
    address: '金纱-2F-53',
    seePrice: '减15',
    businessScope: '大码女装  孕妇装',
  }, {
    storeName: '潮 依 铺',
    address: '新金马-4F-D014',
    seePrice: '减30',
    businessScope: '女装连衣裙 防晒衣 打底衫 套装 等',
  }, {
    storeName: '艾上乐品',
    address: '宝华 3F-320-B',
    seePrice: '减20',
    businessScope: '连衣裙',
  }, {
    storeName: '乔蒙网络服饰',
    address: '国投 4F-413-B',
    seePrice: '减20',
    businessScope: '连衣裙 上衣 外贸 欧美',
  }, {
    storeName: '俊衣阁服饰',
    address: '女人街 2F-A19-D1',
    seePrice: '减20',
    businessScope: '女装',
  }, {
    storeName: '小鸟依人服饰',
    address: '国大 4F-431-A',
    seePrice: '减20',
    businessScope: '女装',
  }],
};

export default connect(state => state.market, actions)(TimerEnhance(MarketPage));
