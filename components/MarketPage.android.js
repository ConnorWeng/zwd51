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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShopInfo from './ShopInfo';
import SpecSelector from './SpecSelector';

class MarketPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
        <ScrollView>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
            </View>
            <TouchableOpacity style={styles.searchFilter} onPress={() => {this.refs.drawerLayout.openDrawer();}}>
              <Icon name="ios-funnel-outline" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
          <ListView
             dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.stores)}
             renderRow={this.renderStore.bind(this)}/>
        </ScrollView>
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

}

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
  }],
};

export default MarketPage;
