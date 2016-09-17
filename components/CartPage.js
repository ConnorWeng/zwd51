import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ListView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PleaseLogin from './PleaseLogin';

const {height, width} = Dimensions.get('window');

class CartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shopDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      goodDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {(() => {
            if (!this.props.member.accessToken) {
              return (
                <PleaseLogin navigator={this.props.navigator}/>
              );
            } else {
              return (
                <ListView
                   dataSource={this.state.shopDataSource.cloneWithRows(MOCKED_DATA.shops)}
                   renderRow={this.renderShop.bind(this)}/>
              );
            }
          })()}
        </ScrollView>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => {}} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>结算</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderShop(shop) {
    return (
      <View style={styles.shopContainer}>
        <View style={styles.shopHeadContainer}>
          <Icon name="ios-home-outline" size={15} color="#000000"/>
          <Text style={styles.shopName}>{shop.store_name}</Text>
        </View>
        <View style={styles.shopBodyContainer}>
          <ListView
             dataSource={this.state.goodDataSource.cloneWithRows(shop.goods)}
             renderRow={this.renderGood.bind(this)}/>
        </View>
      </View>
    );
  }

  renderGood(good) {
    return (
      <View style={styles.goodContainer}>
        <Image style={styles.goodImage} source={{uri: good.goods_image}}/>
        <View style={styles.goodDetailsContainer}>
          <Text style={styles.goodName} numberOfLines={2}>{good.goods_name}</Text>
          <View style={styles.goodPriceContainer}>
            <Text style={styles.goodSubtotal}>¥ {good.subtotal}</Text>
            <Text style={styles.goodQuantity}>x{good.quantity}</Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  shopContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  shopHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  shopName: {
    color: '#000000',
    marginLeft: 5,
  },
  goodContainer: {
    flexDirection: 'row',
  },
  goodDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  goodName: {
    fontSize: 12,
    color: '#000000',
  },
  goodImage: {
    height: 60,
    width: 60,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  goodPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goodSubtotal: {
    color: '#f40',
  },
  goodQuantity: {

  },
  itemActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width,
    height: 42,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  itemAction: {
    width: width / 3,
    justifyContent: 'center',
    borderWidth: 1,
  },
  itemActionText: {
    textAlign: 'center',
    fontSize: 24,
  },
});

const MOCKED_DATA = {
  shops: [{
    "store_name": '第一家店',
    "amount": 20,
    "quantity": 1,
    "goods": [
      {
        "rec_id": "1113",
        "user_id": "8",
        "session_id": "c2fd35f79a49f530c33aa6fab0ea796c",
        "store_id": "5651",
        "goods_id": "964652",
        "goods_name": "2015夏装新款欧美洋气清凉无袖背心上衣7124＃",
        "spec_id": "5628819",
        "specification": "颜色分类:白色 尺码:均码",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i1/TB1ZuMfHFXXXXcEXVXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      }
    ],
    "store_id": "5651",
    "kinds": 1
  }, {
    "store_name": '第二家店',
    "amount": 20,
    "quantity": 1,
    "goods": [
      {
        "rec_id": "1113",
        "user_id": "8",
        "session_id": "c2fd35f79a49f530c33aa6fab0ea796c",
        "store_id": "5651",
        "goods_id": "964652",
        "goods_name": "2015夏装新款欧美洋气清凉无袖背心上衣7124＃",
        "spec_id": "5628819",
        "specification": "颜色分类:白色 尺码:均码",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i1/TB1ZuMfHFXXXXcEXVXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      },
      {
        "rec_id": "19142",
        "user_id": "8",
        "session_id": "b78032360fc361104cb983170fd1fde5",
        "store_id": "15729",
        "goods_id": "1142193",
        "goods_name": "1513#  夏季新款不规则修身显瘦打底裙a字裙无袖背心连衣裙",
        "spec_id": "6640856",
        "specification": "颜色分类:黑色 尺码:S",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i4/TB1QP6fHpXXXXbrXXXXXXXXXXXX_!!2-item_pic.png_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      }
    ],
    "store_id": "15729",
    "kinds": 1
  }],
};

export default connect(state => state)(CartPage);
