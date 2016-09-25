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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerEnhance from 'react-native-smart-timer-enhance';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import ShopInfo from './ShopInfo';
import SpecSelector from './SpecSelector';

class MarketPage extends Component {

  constructor(props) {
    super(props);
    const clonedData = Array.from(MOCKED_DATA.stores);
    clonedData.splice(10);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource,
      stores: dataSource.cloneWithRows(clonedData),
    };
  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SpecSelector category="市场" specs={['全部', '国投', '国大', '大西豪', '富丽', '佰润', '女人街', '金纱', '非凡', '大时代', '宝华', '柏美', '新金马', '西街', '欣欣', '跨客城', '新百佳', '新旺角', '新潮都', '十三行', '广控', '鞋城', '大西豪三晟', '机筑巷', '圣迦', '景叶', '南城', '万佳', '益民', '富壹', '北城', '西苑鞋汇', '金马实体', '新塘牛仔城', '沙河周边', '其他', '其他城市',]}/>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => {this.refs.drawerLayout.closeDrawer();}} style={[styles.itemAction, {borderColor: 'rgba(0,0,0,0.1)', backgroundColor: '#f40'}]}>
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
              <TextInput style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
            </View>
            <TouchableOpacity style={styles.searchFilter} onPress={() => {this.refs.drawerLayout.openDrawer();}}>
              <Icon name="ios-funnel-outline" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
          <PullToRefreshListView
             ref="pullToRefreshListView"
             style={styles.shopListView}
             dataSource={this.state.stores}
             viewType={PullToRefreshListView.constants.viewType.listView}
             renderRow={this.renderStore.bind(this)}
             renderFooter={this.renderFooter.bind(this)}
             onRefresh={this.onRefresh.bind(this)}
             onLoadMore={this.onLoadMore.bind(this)}
             pullUpDistance={35}
             pullUpStayDistance={50}
             initialListSize={10}
             pageSize={10}/>
        </View>
      </DrawerLayoutAndroid>
    );
  }

  renderStore(store) {
    return (
      <TouchableOpacity onPress={() => { this.props.navigator.push({ShopPage: true, store: store}); }}>
        <ShopInfo {...store} />
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
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull up to load more</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>pull up to load more{pullDistancePercent}%</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
        </View>
      );
    case loading_more:
      return (
        <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
          {this.renderActivityIndicator()}<Text>loading</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
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
    this.setTimeout(() => {
      this.setState({
        stores: this.state.dataSource.cloneWithRows(MOCKED_DATA.stores),
      });
      this.refs.pullToRefreshListView.endLoadMore(true);
    }, 1000);
  }

}

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
  storeBusinessScope: {
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

export default TimerEnhance(MarketPage);
