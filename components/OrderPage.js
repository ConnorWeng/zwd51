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
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {getOrders, getAlipayOrderInfo} from '../actions';

class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.props.getOrders(this.props.member.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.message) {
      ToastAndroid.show(nextProps.order.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.lastProcessed) {
      this.props.navigator.push({PaymentPage: true, orderInfo: nextProps.order.lastProcessed.order_info});
    }
  }

  render() {
    return (
      <ScrollView>
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(this.props.order.orders)}
           renderRow={this.renderOrder.bind(this)}/>
      </ScrollView>
    );
  }

  renderOrder(order) {
    const goods = [];
    for (var g in order.order_goods) {
      const goods_image = order.order_goods[g].goods_image;
      const goods_id = order.order_goods[g].goods_id;
      goods.push(
        <Image style={{height: 60, width: 60, marginTop: 5, marginRight: 5, marginBottom: 5}} source={{uri: goods_image}} key={goods_id}/>
      );
    }
    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderHeadContainer}>
          <Text style={styles.orderSn}>订单号：{order.order_sn}</Text>
        </View>
        <View style={styles.orderBodyContainer}>
          <View style={styles.orderGoodsContainer}>
            {goods}
          </View>
          <View style={styles.orderAmountContainer}>
            <Text style={styles.orderAmount}>实付款：¥ {order.order_amount}</Text>
          </View>
        </View>
        <View style={styles.orderFootContainer}>
          <TouchableOpacity style={styles.orderActionContainer} onPress={() =>
            this.props.getAlipayOrderInfo(order.order_id, this.props.member.accessToken)}>
            <Text style={styles.orderActionLabel}>{order.status == '11' ? '支付' : '查看订单'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const actions = (dispatch) => {
  return {
    getOrders: (accessToken) => dispatch(getOrders(accessToken)),
    getAlipayOrderInfo: (orderId, accessToken) => dispatch(getAlipayOrderInfo(orderId, accessToken)),
  };
};

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

export default connect(state => state, actions)(OrderPage);
