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
  ActivityIndicator,
  ProgressBarAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import OrderHead from './OrderHead';
import {getOrders, getAlipayOrderInfo, clearAlipayOrderInfo, confirmOrder, clearOrders, refreshOrders} from '../actions';

const {height, width} = Dimensions.get('window');

class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      orders: this.dataSource.cloneWithRows(props.order.getOrdersRequest.data),
    };
    this.confirmTimer = false;
  }

  componentDidMount() {
    this.onLoadMore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.getOrdersRequest.message) {
      ToastAndroid.show(nextProps.order.getOrdersRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.getOrdersRequest.data) {
      this.setState({
        orders: this.dataSource.cloneWithRows(nextProps.order.getOrdersRequest.data),
      });
      this.refs.pullToRefreshListView.endRefresh();
    }
    this.refs.pullToRefreshListView.endLoadMore(nextProps.order.getOrdersRequest.isEnd);
    if (nextProps.order.getAlipayOrderInfoRequest.orderInfo) {
      this.props.navigator.push({
        PaymentPage: true,
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
        <PullToRefreshListView
           ref="pullToRefreshListView"
           dataSource={this.state.orders}
           viewType={PullToRefreshListView.constants.viewType.listView}
           style={styles.orderListView}
           initialListSize={25}
           enableEmptySections={true}
           pageSize={25}
           renderRow={this.renderOrder.bind(this)}
           renderHeader={this.renderHeader.bind(this)}
           renderFooter={this.renderFooter.bind(this)}
           onRefresh={this.onRefresh.bind(this)}
           onLoadMore={this.onLoadMore.bind(this)}
           pullDownDistance={35}
           pullDownStayDistance={50}
           pullUpDistance={35}
           pullUpStayDistance={50}/>
        <Spinner visible={this.props.order.getOrdersRequest.isLoading || this.props.order.submitOrderRequest.isLoading || this.props.order.getAlipayOrderInfoRequest.isLoading|| this.props.order.confirmOrderRequest.isLoading}/>
      </View>
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
          { order.status === '30' || order.status === '40' ?
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

  renderHeader(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case refresh_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>下拉刷新</Text>
        </View>
      );
    case refresh_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>继续下拉刷新</Text>
        </View>
      );
    case will_refresh:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>放开立即刷新</Text>
        </View>
      );
    case refreshing:
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          {this.renderActivityIndicator()}<Text>加载中</Text>
        </View>
      );
    }
  }

  renderFooter(viewState) {
    let {pullState, pullDistancePercent} = viewState;
    const {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState;
    pullDistancePercent = Math.round(pullDistancePercent * 100);
    switch(pullState) {
    case load_more_none:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case load_more_idle:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>上拉加载更多</Text>
        </View>
      );
    case will_load_more:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          <Text>放开加载更多</Text>
        </View>
      );
    case loading_more:
      return (
        <View style={{flexDirection: 'row', height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
          {this.renderActivityIndicator()}<Text>加载中...</Text>
        </View>
      );
    case loaded_all:
      return (
        <View style={{height: 35, width: width, justifyContent: 'center', alignItems: 'center',}}>
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
    this.props.clearOrders();
    this.props.refreshOrders(this.props.member.accessToken);
  }

  onLoadMore() {
    this.props.getOrders(this.props.order.getOrdersRequest.page, this.props.member.accessToken);
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
