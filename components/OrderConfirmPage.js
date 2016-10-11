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
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import TouchableContainerItem from './TouchableContainerItem';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';
import {submitOrder, getOrderGoodsInfo} from '../actions';

const {height, width} = Dimensions.get('window');

class OrderConfirmPage extends Component {

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
    if (nextProps.order.message) {
      ToastAndroid.show(nextProps.order.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.lastProcessed) {
      const newOrder = nextProps.order.lastProcessed;
      this.props.navigator.push({
        PaymentPage: true,
        orderInfo: newOrder.order_info,
        orderAmount: newOrder.order_amount,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 80}} arrow={true} onPress={() => {this.props.navigator.push({AddressPage: true, addr: this.props.order.goodsInfo.default_address ? this.props.order.goodsInfo.default_address : {}})}}>
              <Text style={styles.receiverName}>{this.props.order.goodsInfo.default_address ? this.props.order.goodsInfo.default_address.consignee : ''}</Text>
              <Text style={styles.receiverMobile}>{this.props.order.goodsInfo.default_address ? this.props.order.goodsInfo.default_address.phone_mob : ''}</Text>
              <Text style={styles.receiverAddress} numberOfLines={1}>{this.props.order.goodsInfo.default_address ? this.props.order.goodsInfo.default_address.address : ''}</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 100}} bodyStyle={{justifyContent: 'space-between'}} arrow={true}>
              <View style={{flexDirection: 'row'}}>
                {(() => {
                  if (this.props.order.goodsInfo.items) {
                    const images = [];
                    this.props.order.goodsInfo.items.forEach((item) => {
                      images.push(
                        <Image key={'image_' + item.goods_id} style={styles.itemImage}
                               source={{uri: item.goods_image}}/>
                      );
                    });
                    return images;
                  }
                })()}
              </View>
              <Text>共{this.props.order.goodsInfo.items ? this.props.order.goodsInfo.items.length : 0}件</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>配送：51代发</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>商品金额</Text>
              <Text style={{color: '#f40'}}>{this.props.order.goodsInfo.amount}</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>代发费用</Text>
              <Text style={{color: '#f40'}}>+ {this.props.order.goodsInfo.behalf_fee}</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
        </ScrollView>
        <View style={styles.actionContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>实付款：¥{this.props.order.goodsInfo.amount + this.props.order.goodsInfo.behalf_fee}</Text>
          </View>
          <TouchableOpacity onPress={this.submitOrder.bind(this)} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>{this.props.order.isProcessing ? '处理中...' : '提交订单'}</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.props.order.isProcessing}/>
      </View>
    );
  }

  submitOrder() {
    this.props.submitOrder(this.props.specIds.join(','), this.props.specNums.join(','),
                           this.props.order.goodsInfo.default_address.addr_id, 10919, 28, '', this.props.member.accessToken);
  }

}

const actions = (dispatch) => {
  return {
    submitOrder: (specIds, specNums, addressId,
                  behalfId, deliveryId, postscript,
                  accessToken) => dispatch(
                    submitOrder(specIds, specNums, addressId,
                                behalfId, deliveryId, postscript,
                                accessToken)
                  ),
    getOrderGoodsInfo: (specIds, specNums, accessToken) => dispatch(getOrderGoodsInfo(specIds, specNums, accessToken)),
  };
};

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
});

export default connect(state => state, actions)(OrderConfirmPage);
