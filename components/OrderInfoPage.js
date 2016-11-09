import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  ToastAndroid,
  Image,
  Clipboard,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import OrderHead from './OrderHead';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';
import TouchableContainerItem from './TouchableContainerItem';
import {getOrderInfo} from '../actions';

const {height, width} = Dimensions.get('window');

class OrderInfoPage extends Component {

  componentDidMount() {
    this.props.getOrderInfo(this.props.orderId, this.props.member.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.getOrderInfoRequest.message) {
      ToastAndroid.show(nextProps.order.getOrderInfoRequest.message, ToastAndroid.SHORT);
    }
  }

  render() {
    if (!this.props.order.getOrderInfoRequest.orderInfo) {
      return (
        <View></View>
      );
    }
    const orderInfo = this.props.order.getOrderInfoRequest.orderInfo;
    const order = orderInfo.order;
    const mergeSgoods = orderInfo.merge_sgoods;
    const orderDetail = orderInfo.order_detail;
    const orderExtm = orderDetail.order_extm;
    const behalfInfo = orderDetail.behalf_info;

    const stores = [];
    for (const storeId in mergeSgoods) {
      const store = mergeSgoods[storeId];
      const storeInfo = store.store_info;
      const goodsList = store.goods_list;
      let quantity = 0;
      goodsList.forEach((good) => {
        quantity += parseInt(good.quantity);
      });
      stores.push(
        <TouchableContainerItemsGroup key={storeInfo.store_id} style={{marginTop: 10}}>
          <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
            <Text>店铺名</Text>
            <Text>{storeInfo.store_name}</Text>
          </TouchableContainerItem>
          <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
            <Text>档口地址</Text>
            <Text>{storeInfo.mk_name + ' ' + storeInfo.dangkou_address}</Text>
          </TouchableContainerItem>
          <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
            <Text>电话号码</Text>
            <Text>{storeInfo.tel}</Text>
          </TouchableContainerItem>
          <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
            <Text>旺旺</Text>
            <Text>{storeInfo.im_ww}</Text>
          </TouchableContainerItem>
          <TouchableContainerItem style={{height: 100}} bodyStyle={{justifyContent: 'space-between'}} arrow={true} onPress={() => {this.props.navigator.push({OrderGoodsPage: true, goods: goodsList});}}>
            <View style={{flexDirection: 'row'}}>
              {(() => {
                if (goodsList) {
                  const images = [];
                  goodsList.forEach((good) => {
                    images.push(
                      <Image key={'image_' + good.goods_id} style={styles.itemImage}
                             source={{uri: good.goods_image}}/>
                    );
                  });
                  return images;
                }
              })()}
          </View>
          <Text>共{quantity}件</Text>
          </TouchableContainerItem>
        </TouchableContainerItemsGroup>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <OrderHead orderSn={order.order_sn} orderStatus={order.status}/>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>下单时间</Text>
              <Text>{moment(order.order_add_time * 1000).format('YYYY-MM-DD hh:mm:ss')}</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>运费</Text>
              <Text style={{color: '#f40'}}>¥ {orderExtm.shipping_fee}</Text>
              <Text>优惠打折</Text>
              <Text style={{color: '#f40'}}>¥ 0</Text>
              <Text>总价</Text>
              <Text style={{color: '#f40'}}>¥ {order.order_amount}</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          {stores}
          <View style={styles.addressContainer}>
            <View style={styles.receiverContainer}>
              <Text style={styles.receiverName}>{orderExtm.consignee}</Text>
              <Text style={styles.receiverMobile}>{orderExtm.phone_mob}</Text>
              <Text style={styles.receiverAddress} numberOfLines={1}>{orderExtm.region_name + ' ' + orderExtm.address}</Text>
            </View>
          </View>
        <TouchableContainerItemsGroup>
        <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
        <Text>配送方式</Text>
        <Text>{behalfInfo.bh_name}</Text>
        </TouchableContainerItem>
        <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
        <Text>快递</Text>
        <Text>{orderExtm.dl_id}</Text>
        </TouchableContainerItem>
        <TouchableContainerItem onPress={() => {this.clip(order.invoice_no)}} style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
        <Text>物流单号</Text>
        <Text>{order.invoice_no}</Text>
        </TouchableContainerItem>
        <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
        <Text>代发电话</Text>
        <Text>{behalfInfo.bh_tel}</Text>
        </TouchableContainerItem>
        <TouchableContainerItem onPress={() => {this.clip(behalfInfo.bh_qq)}} style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
        <Text>代发QQ</Text>
        <Text>{behalfInfo.bh_qq}</Text>
        </TouchableContainerItem>
        </TouchableContainerItemsGroup>
        </ScrollView>
        <Spinner visible={this.props.order.getOrderInfoRequest.isLoading}/>
      </View>
    );

  }

  clip(invoiceNo) {
    Clipboard.setString(invoiceNo);
    ToastAndroid.show('已复制', ToastAndroid.SHORT);
  }

}

const actions = (dispatch) => {
  return {
    getOrderInfo: (orderId, accessToken) => dispatch(getOrderInfo(orderId, accessToken)),
  };
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    height: 80,
    marginTop: 10,
  },
  receiverContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    flex: 8,
  },
  receiverName: {
    fontSize: 18,
  },
  receiverMobile: {
    fontSize: 18,
    marginLeft: 10,
  },
  receiverAddress: {
    marginTop: 10,
    width: width - 60,
  },
  itemImage: {
    height: 60,
    width: 60,
    marginRight: 5,
  },
});

export default connect(state => state, actions)(OrderInfoPage);
