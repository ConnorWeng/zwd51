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
  ToastAndroid,
  Dimensions,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import OrderHead from './OrderHead';
import Loading from './Loading';
import {getOrders, getAlipayOrderInfo, clearAlipayOrderInfo, confirmOrder, clearOrders, refreshOrders} from '../actions';
import {PAGE_SIZE} from '../service.json';

const {height, width} = Dimensions.get('window');

class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.confirmTimer = false;
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.onLoadMore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.getAlipayOrderInfoRequest.orderInfo) {
      this.props.navigator.push({
        PaymentPage: true,
        orderId: nextProps.order.getAlipayOrderInfoRequest.orderInfo.order_id,
        orderInfo: nextProps.order.getAlipayOrderInfoRequest.orderInfo.order_info,
        orderAmount: nextProps.order.getAlipayOrderInfoRequest.orderInfo.order_amount,
      });
      this.props.clearAlipayOrderInfo();
    }
    if (nextProps.order.confirmOrderRequest.message) {
      ToastAndroid.show(nextProps.order.confirmOrderRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.confirmOrderRequest.success) {
      ToastAndroid.show('确认成功', ToastAndroid.SHORT);
      if (!this.confirmTimer) {
        // 等待CLEAR_MESSAGE事件触发之后再触发刷新
        this.confirmTimer = setTimeout(((ref) => {
          return () => {
            ref.onRefresh();
            ref.confirmTimer = false;
          };
        })(this), 3000);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
           ref="flatList"
           style={styles.orderListView}
           keyExtractor={this.keyExtractor.bind(this)}
           ListFooterComponent={this.renderFooter.bind(this)}
           renderItem={this.renderOrder.bind(this)}
           data={this.props.order.getOrdersRequest.data}
           onEndReached={this.onLoadMore.bind(this)}
           onEndReachedThreshold={0.01}
           refreshing={this.state.refreshing}
           onRefresh={this.onRefresh.bind(this)}/>
        <Spinner visible={this.props.order.submitOrderRequest.isLoading || this.props.order.getAlipayOrderInfoRequest.isLoading|| this.props.order.confirmOrderRequest.isLoading}/>
      </View>
    );
  }

  keyExtractor(item, index) {
    return item.order_id;
  }

  renderOrder({item}) {
    const order = item;
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
        <OrderHead orderSn={order.order_sn} orderStatus={order.status}/>
        <View style={styles.orderBodyContainer}>
          <View style={styles.orderGoodsContainer}>
            {goods}
          </View>
          <View style={styles.orderAmountContainer}>
            <Text style={styles.orderAmount}>实付款：¥ {order.order_amount}</Text>
          </View>
        </View>
        <View style={styles.orderFootContainer}>
          { order.status === '11' ?
              <TouchableOpacity style={styles.orderActionContainer} onPress={() =>
                this.props.getAlipayOrderInfo(order.order_id, this.props.member.accessToken)}>
                <Text style={styles.orderActionLabel}>支付</Text>
              </TouchableOpacity>
            : null }
          { order.status === '30' ?
              <TouchableOpacity style={styles.orderActionContainer} onPress={() =>
                this.props.confirmOrder(order.order_id, this.props.member.accessToken)}>
                <Text style={styles.orderActionLabel}>确认收货</Text>
              </TouchableOpacity>
              : null }
          { order.status === '20' || order.status === '30' || order.status === '40' ?
              <TouchableOpacity style={styles.orderActionContainer} onPress={() => {
                this.props.navigator.push({RefundPage: true, orderAmount: order.order_amount, orderId: order.order_id, orderStatus: order.status});}}>
                <Text style={styles.orderActionLabel}>退货退款</Text>
              </TouchableOpacity>
              : null }
          <View style={{flexDirection: 'row',}}>
            <TouchableOpacity style={styles.orderActionContainer} onPress={() =>
              this.props.navigator.push({OrderInfoPage: true, orderId: order.order_id})}>
              <Text style={styles.orderActionLabel}>查看订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderFooter() {
    if (this.state.refreshing) {
      return null;
    }
    if (this.props.order.getOrdersRequest.isEnd) {
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Text>没有更多了</Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center', }}>
          <Loading/>
          <Text>加载中...</Text>
        </View>
      );
    }
  }

  onRefresh() {
    this.setState({
      refreshing: true,
    });
    this.props.clearOrders();
    this.props.refreshOrders(this.props.member.accessToken).then((json) => {
      this.setState({
        refreshing: false,
      });
      if (json.error) {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    });
  }

  onLoadMore() {
    this.props.getOrders(this.props.order.getOrdersRequest.page, this.props.member.accessToken).then((json) => {
      if (json.error) {
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
      }
    });
  }

}

const actions = (dispatch) => {
  return {
    getOrders: (page, accessToken) => dispatch(getOrders(page, accessToken)),
    getAlipayOrderInfo: (orderId, accessToken) => dispatch(getAlipayOrderInfo(orderId, accessToken)),
    clearAlipayOrderInfo: () => dispatch(clearAlipayOrderInfo()),
    confirmOrder: (orderId, accessToken) => dispatch(confirmOrder(orderId, accessToken)),
    clearOrders: () => dispatch(clearOrders()),
    refreshOrders: (accessToken) => dispatch(refreshOrders(accessToken)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderListView: {
    height: height - 35,
  },
  orderContainer: {
    marginBottom: 10,
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
    flexDirection: 'row',
    paddingRight: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  orderActionContainer: {
    borderWidth: 1,
    borderColor: '#f40',
    marginTop: 3,
    marginLeft: 3,
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
