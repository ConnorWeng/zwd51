import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Picker,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import TouchableContainerItem from './TouchableContainerItem';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';
import {mapDispatchToProps} from '../actions/mapper';

const {height, width} = Dimensions.get('window');

class OrderConfirmPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bhId: null,
      behalf: null,
      dlId: null,
      deliveryFee: 10,
      deliveries: [],
    };
  }

  componentDidMount() {
    if (!this.props.member.accessToken) {
      this.props.navigator.push({LoginPage: true});
    } else {
      const specIds = this.props.specIds.join(',');
      const specNums = this.props.specNums.join(',');
      this.props.getOrderGoodsInfo(specIds, specNums, this.props.member.accessToken);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.getOrderGoodsRequest.message) {
      ToastAndroid.show(nextProps.order.getOrderGoodsRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.submitOrderRequest.message) {
      ToastAndroid.show(nextProps.order.submitOrderRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.submitOrderRequest.orderInfo) {
      const newOrder = nextProps.order.submitOrderRequest.orderInfo;
      this.props.navigator.push({
        PaymentPage: true,
        orderId: newOrder.order_id,
        orderInfo: newOrder.order_info,
        orderAmount: newOrder.order_amount,
      });
      this.props.clearSubmitOrderInfo();
    }
    if (this.state.bhId === null && nextProps.order.getOrderGoodsRequest.goodsInfo.behalfs) {
      this.onSelectBehalf(nextProps.order.getOrderGoodsRequest.goodsInfo.behalfs[0].bh_id);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 80}} arrow={true} onPress={() => {this.props.navigator.push({AddressPage: true, addr: this.props.order.getOrderGoodsRequest.goodsInfo.default_address ? this.props.order.getOrderGoodsRequest.goodsInfo.default_address : {}})}}>
              {
                this.props.order.getOrderGoodsRequest.goodsInfo.default_address ?
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', flex: 1}}>
                    <Text style={styles.receiverName}>{this.props.order.getOrderGoodsRequest.goodsInfo.default_address.consignee}</Text>
                    <Text style={styles.receiverMobile}>{this.props.order.getOrderGoodsRequest.goodsInfo.default_address.phone_mob}</Text>
                    <Text style={styles.receiverAddress} numberOfLines={1}>{this.props.order.getOrderGoodsRequest.goodsInfo.default_address.address}</Text>
                  </View> :
                  <Text style={styles.pleaseSelectAddress}>请选择收货地址</Text>
              }
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 100}} bodyStyle={{justifyContent: 'space-between'}} arrow={true} onPress={() => {this.props.navigator.push({OrderGoodsPage: true, goods: this.props.order.getOrderGoodsRequest.goodsInfo.items});}}>
              <View style={{flexDirection: 'row'}}>
                {(() => {
                  if (this.props.order.getOrderGoodsRequest.goodsInfo.items) {
                    const images = [];
                    this.props.order.getOrderGoodsRequest.goodsInfo.items.forEach((item) => {
                      images.push(
                        <Image key={'image_' + item.goods_id} style={styles.itemImage}
                               source={{uri: item.goods_image}}/>
                      );
                    });
                    return images;
                  }
                })()}
              </View>
              <Text>共{this.props.order.getOrderGoodsRequest.goodsInfo ? this.props.order.getOrderGoodsRequest.goodsInfo.quantity : 0}件</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>代发：</Text>
              <Picker style={{flex: 1}} selectedValue={this.state.bhId} onValueChange={this.onSelectBehalf.bind(this)}>
              {
                this.props.order.getOrderGoodsRequest.goodsInfo.behalfs ?
                  this.props.order.getOrderGoodsRequest.goodsInfo.behalfs.map((behalf) => {
                    return (
                      <Picker.Item key={behalf.bh_id} label={behalf.bh_name} value={behalf.bh_id}/>
                    );
                  }) : null
              }
              </Picker>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>快递：</Text>
              <Picker style={{flex: 1}} selectedValue={this.state.dlId} onValueChange={this.onSelectDelivery.bind(this)}>
              {
                this.state.deliveries.map((dl) => {
                  return (
                    <Picker.Item key={dl.dl_id} label={dl.dl_name} value={dl.dl_id}/>
                  );
                })
              }
              </Picker>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>商品金额</Text>
              <Text style={{color: '#f40'}}>{this.props.order.getOrderGoodsRequest.goodsInfo.amount}</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>代发费用</Text>
              <Text style={{color: '#f40'}}>+ {this.props.order.getOrderGoodsRequest.goodsInfo.behalf_fee}</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>快递费用</Text>
              <Text style={{color: '#f40'}}>+ {this.state.deliveryFee}</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text style={{color: '#f40'}}>vip优惠</Text>
              <Text style={{color: '#f40'}}>- {this.props.order.getVipDiscountRequest.vipDiscount ? this.props.order.getVipDiscountRequest.vipDiscount : '0'}</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
        </ScrollView>
        <View style={styles.actionContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>实付款：¥{this.props.order.getOrderGoodsRequest.goodsInfo.amount + this.props.order.getOrderGoodsRequest.goodsInfo.behalf_fee + this.state.deliveryFee - parseFloat(this.props.order.getVipDiscountRequest.vipDiscount)}</Text>
          </View>
          <TouchableOpacity onPress={this.submitOrder.bind(this)} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>{this.props.order.submitOrderRequest.isLoading ? '处理中...' : '提交订单'}</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.props.order.getOrderGoodsRequest.isLoading || this.props.order.submitOrderRequest.isLoading || this.props.order.getVipDiscountRequest.isLoading}/>
      </View>
    );
  }

  submitOrder() {
    if (!this.props.order.getOrderGoodsRequest.goodsInfo.default_address) {
      return ToastAndroid.show('请选择收货地址', ToastAndroid.SHORT);
    }
    if (!this.state.bhId) {
      return ToastAndroid.show('请选择代发', ToastAndroid.SHORT);
    }
    if (!this.state.dlId) {
      return ToastAndroid.show('请选择快递', ToastAndroid.SHORT);
    }
    this.props.submitOrder(this.props.specIds.join(','), this.props.specNums.join(','),
                           this.props.order.getOrderGoodsRequest.goodsInfo.default_address.addr_id, this.state.bhId, this.state.dlId, '', this.props.member.accessToken);
  }

  onSelectBehalf(value) {
    if (this.props.order.getOrderGoodsRequest.goodsInfo.behalfs) {
      this.props.getVipDiscount(value, this.props.member.accessToken);
      const deliveries = [];
      const selectedBehalfs = this.props.order.getOrderGoodsRequest.goodsInfo.behalfs.filter((behalf) => {
        if (behalf.bh_id === value) {
          return true;
        } else {
          return false;
        }
      });
      for (const dlId in selectedBehalfs[0]['deliveries']) {
        deliveries.push(selectedBehalfs[0]['deliveries'][dlId]);
      }
      this.setState({
        bhId: value,
        behalf: selectedBehalfs[0],
        dlId: deliveries[0].dl_id,
        deliveryFee: this.caculateDeliveryFee(deliveries[0]),
        deliveries: deliveries,
      });
    }
  }

  onSelectDelivery(value) {
    this.setState({
      dlId: value,
      deliveryFee: this.caculateDeliveryFee(this.state.behalf.deliveries[value]),
    });
  }

  caculateDeliveryFee(delivery) {
    const quantity =  this.props.order.getOrderGoodsRequest.goodsInfo.quantity;
    if (delivery && quantity > 0) {
      const firstPrice = parseInt(parseFloat(delivery.first_price) * 100);
      const firstAmount = parseInt(delivery.first_amount);
      const stepPrice = parseInt(parseFloat(delivery.step_price) * 100);
      const stepAmount = parseInt(delivery.step_amount);
      return (((firstAmount * firstPrice) + (quantity - firstAmount) * stepPrice) / 100.0);
    } else {
      return 0;
    }
  }

}

const styles = StyleSheet.create({
  receiverName: {
    fontSize: 18,
    color: '#000000',
  },
  receiverMobile: {
    fontSize: 18,
    color: '#000000',
    marginLeft: 10,
  },
  receiverAddress: {
    marginTop: 10,
    width: width - 60,
  },
  priceContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  priceText: {
    color: '#f40',
    fontSize: 20,
  },
  itemImage: {
    height: 60,
    width: 60,
    marginRight: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    width: width,
    height: 42,
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    left: 0,
    bottom: 0,
  },
  submitAction: {
    flex: 2,
    justifyContent: 'center',
    borderWidth: 1,
  },
  submitActionText: {
    textAlign: 'center',
    fontSize: 24,
  },
  pleaseSelectAddress: {
    fontSize: 18,
  }
});

export default connect(state => state, mapDispatchToProps)(OrderConfirmPage);
