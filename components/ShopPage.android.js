import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ShopPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
          </View>
          <TouchableOpacity style={styles.searchFilter} onPress={() => {}}>
            <Icon name="ios-funnel-outline" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.stores)}
           renderRow={this.renderStore.bind(this)}/>
      </ScrollView>
    );
  }

  renderStore(store) {
    return (
      <TouchableOpacity onPress={()=>{}}>
        <View style={styles.storeContainer}>
          <View style={styles.storeHeadContainer}>
            <View style={styles.storeHead}>
              <Text style={styles.storeName}>{store.storeName}</Text>
              <View style={styles.storeSeePriceContainer}>
                <Text style={styles.storeSeePrice}>{store.seePrice}</Text>
              </View>
            </View>
            <Text style={styles.storeAddress}>{store.address}</Text>
          </View>
          <View style={styles.storeBodyContainer}>
            <Text style={styles.storeBusinessScopeLabel}>主营：</Text>
            <Text style={styles.storeBusinessScope}>{store.businessScope}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
  storeContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeHeadContainer: {
    marginLeft: 5,
  },
  storeHead: {
    flexDirection: 'row',
  },
  storeName: {
    fontSize: 18,
    color: '#000000',
  },
  storeSeePriceContainer: {
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#f40',
    justifyContent: 'center',
  },
  storeSeePrice: {
    fontSize: 14,
    color: '#ffffff',
  },
  storeAddress: {
    fontSize: 14,
  },
  storeBodyContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeBusinessScopeLabel: {
    color: '#000000',
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

export default ShopPage;
