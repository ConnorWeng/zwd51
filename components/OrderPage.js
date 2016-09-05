import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  ListView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class OrderPage extends Component {

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
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.orders)}
           renderRow={this.renderOrder.bind(this)}/>
      </ScrollView>
    );
  }

  renderOrder(order) {
    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderHeadContainer}>
          <Text style={styles.orderSn}>订单号：{order.orderSn}</Text>
        </View>
        <View style={styles.orderBodyContainer}>
          <View style={styles.orderGoodsContainer}>
            {
              order.goods.map((good) => <Image style={{height: 100, width: 100, marginRight: 5}} source={{uri: good.defaultImage}} key={good.goodsId}/>)
            }
          </View>
          <View style={styles.orderAmountContainer}>
            <Text style={styles.orderAmount}>实付款：¥ {order.orderAmount}</Text>
          </View>
        </View>
        <View style={styles.orderFootContainer}>
          <TouchableOpacity style={styles.orderActionContainer}>
            { order.status == '11' ? <Text style={styles.orderActionLabel}>支付</Text> : <Text style={styles.orderActionLabel}>查看订单</Text> }
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  orderContainer: {
    marginTop: 10,
  },
  orderHeadContainer: {
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  orderSn: {
    color: '#000000',
  },
  orderBodyContainer: {
  },
  orderGoodsContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  orderAmountContainer: {
    paddingRight: 10,
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  },
  orderAmount: {
    color: '#000000',
  },
  orderFootContainer: {
    paddingRight: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-end',
  },
  orderActionContainer: {
    borderWidth: 1,
    borderColor: '#f40',
    marginTop: 3,
    paddingTop: 2,
    marginBottom: 3,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,

  },
  orderActionLabel: {
    fontSize: 16,
    color: '#f40',
  }
});

const MOCKED_DATA = {
  orders: [{
    orderSn: '1525745236',
    orderAmount: '10.00',
    status: 20,
    goods: [{
      goodsId: 1,
      goodsName: '实拍 8511# 新款韩版女装时尚短袖印花T恤宽松大码T恤衫',
      defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/485700822/TB216FtnXXXXXcXXXXXXXXXXXXX_!!485700822.jpg',
    }],
  }, {
    orderSn: '1525745236',
    orderAmount: '20.50',
    status: 11,
    goods: [{
      goodsId: 2,
      goodsName: '实拍现货9621#2016情侣装 韩版宽松 印花百搭情侣T恤潮',
      defaultImage: 'https://img.alicdn.com/bao/uploaded/i2/1993861789/TB2JSJ2oVXXXXbiXXXXXXXXXXXX_!!1993861789.jpg',
    }, {
      goodsId: 3,
      goodsName: '(实拍)新款8259 浅色宽松破洞休闲磨破牛仔哈伦裤女垮裤',
      defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/855301567/TB2.h.HlpXXXXXZXXXXXXXXXXXX_!!855301567.jpg',
    }],
  }],
};

export default OrderPage;
