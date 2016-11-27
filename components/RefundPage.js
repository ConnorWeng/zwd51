import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Picker,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import TouchableContainerItem from './TouchableContainerItem';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';
import LabelAndInput from './LabelAndInput';
import MultiSelect from './MultiSelect';
import {applyRefund, getOrderInfoForRefund, clearOrderInfoForRefund} from '../actions';

const {height, width} = Dimensions.get('window');

class RefundPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.orderAmount,
      intro: '',
      reason: '退还商品差价(换货)',
      deliveryName: '',
      invoiceNo: '',
    };
  }

  componentWillUnmount() {
    this.props.clearOrderInfoForRefund();
  }

  render() {
    if (this.props.order.applyRefundRequest.message) {
      ToastAndroid.show(this.props.order.applyRefundRequest.message, ToastAndroid.SHORT);
    }

    if (this.props.order.getOrderInfoForRefundRequest.message) {
      ToastAndroid.show(this.props.order.getOrderInfoForRefundRequest.message, ToastAndroid.LONG);
    }

    if (this.props.order.applyRefundRequest.success) {
      ToastAndroid.show('已提交申请', ToastAndroid.SHORT);
      this.props.navigator.pop();
    }

    let returnGoodsView = null;
    if (this.state.reason === '申请退货' && this.props.order.getOrderInfoForRefundRequest.order) {
      let multiSelect = null;
      if (this.props.order.getOrderInfoForRefundRequest.order.gwh) {
        const returnGoods = [];
        const gwh = this.props.order.getOrderInfoForRefundRequest.order.gwh;
        for (var k in gwh) {
          const g = gwh[k];
          returnGoods.push(
            <View key={g.id} myKey={g.id} value={g.id} style={styles.returnGood}>
              <Text>商品编码：{g.goods_no}   ¥{g.goods_price}</Text>
            </View>
          );
        }
        multiSelect = (
          <MultiSelect ref="multiSelect">
            {returnGoods}
          </MultiSelect>
        );
      }
      returnGoodsView = (
        <TouchableContainerItemsGroup>
          <TouchableContainerItem style={{height: 60}} arrow={false}>
            <Text style={{fontSize: 16}}>回寄物流：</Text>
            <Picker style={{flex: 1}} selectedValue={this.state.deliveryName} onValueChange={(value) => this.setState({deliveryName: value})}>
              {
                this.props.order.getOrderInfoForRefundRequest.deliverys.map((d, i) => {
                  return (
                    <Picker.Item key={i} label={d.dl_name} value={d.dl_id + ':' + d.dl_name + ':' + d.dl_desc}/>
                  );
                })
              }
            </Picker>
          </TouchableContainerItem>
          <TouchableContainerItem style={{height: 60}} arrow={false}>
            <Text style={{fontSize: 16}}>回寄单号：</Text>
            <TextInput ref="invoiceNo" style={{flex: 1}} keyboardType="numeric" value={this.state.invoiceNo} onChangeText={(text) => this.setState({invoiceNo: text})}/>
          </TouchableContainerItem>
          <View style={styles.returnGoodsContainer}>
            <View style={styles.returnGoodsLabelContainer}>
              <Text style={styles.returnGoodsLabel}>请选择要退货的商品：</Text>
            </View>
            {multiSelect}
          </View>
        </TouchableContainerItemsGroup>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款原因：</Text>
                {
                  this.props.orderStatus === '20' ?
                    (
                      <Picker style={{flex: 1}} selectedValue={this.state.reason} onValueChange={this.onReasonChange.bind(this)}>
                        <Picker.Item key="1" label="退还商品差价(换货)" value="退还商品差价(换货)"/>
                        <Picker.Item key="2" label="申请退货" value="申请退货"/>
                        <Picker.Item key="3" label="全额退款(取消订单)" value="全额退款(取消订单)"/>
                      </Picker>
                    ) :
                    (
                      <Picker style={{flex: 1}} selectedValue={this.state.reason} onValueChange={this.onReasonChange.bind(this)}>
                        <Picker.Item key="1" label="退还商品差价(换货)" value="退还商品差价(换货)"/>
                        <Picker.Item key="2" label="申请退货" value="申请退货"/>
                      </Picker>
                    )
                }
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款金额：</Text>
              <TextInput ref="amountInput" style={{flex: 1}} value={this.state.amount} onChangeText={(text) => this.setState({amount: text})}/>
            </TouchableContainerItem>
            {
              this.state.reason !== '申请退货' ? (
                <TouchableContainerItem style={{height: 60}} arrow={false}>
                  <Text style={{fontSize: 16}}>退款说明：</Text>
                  <TextInput ref="introInput" style={{flex: 1}} value={this.state.intro} onChangeText={(text) => this.setState({intro: text})}/>
                </TouchableContainerItem>
              ) : null
            }
          </TouchableContainerItemsGroup>
          {returnGoodsView}
        </ScrollView>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={this.apply.bind(this)} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>提交</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.props.order.applyRefundRequest.isLoading || this.props.order.getOrderInfoForRefundRequest.isLoading}/>
      </View>
    );
  }

  apply() {
    if (!this.state.amount) {
      ToastAndroid.show('请填写退款金额', ToastAndroid.SHORT);
      return false;
    }

    let goodsIds = '';
    if (this.state.reason === '申请退货' && this.refs.multiSelect) {
      goodsIds = this.refs.multiSelect.getSelected().join(',');
      if (!goodsIds) {
        ToastAndroid.show('请选择需要退货的商品', ToastAndroid.SHORT);
        return false;
      }
      if (!this.state.invoiceNo) {
        ToastAndroid.show('请填写回寄单号', ToastAndroid.SHORT);
        return false;
      }
      if (!this.state.deliveryName) {
        ToastAndroid.show('请选择回寄物流', ToastAndroid.SHORT);
        return false;
      }
    }
    this.props.applyRefund(this.props.orderId, this.state.amount, this.state.reason, this.state.intro, goodsIds, this.state.invoiceNo, this.state.deliveryName, this.props.member.accessToken);
  }

  onReasonChange(value) {
    if (value === '申请退货' && !this.props.order.getOrderInfoForRefundRequest.order) {
      this.props.getOrderInfoForRefund(this.props.orderId, this.props.member.accessToken);
    }
    this.setState({reason: value});
  }

}

const actions = (dispatch) => {
  return {
    applyRefund: (orderId, refundAmount, refundReason, refundIntro, goodsIds, invoiceNo, deliveryName, accessToken) => dispatch(applyRefund(orderId, refundAmount, refundReason, refundIntro, goodsIds, invoiceNo, deliveryName, accessToken)),
    getOrderInfoForRefund: (orderId, accessToken) => dispatch(getOrderInfoForRefund(orderId, accessToken)),
    clearOrderInfoForRefund: () => dispatch(clearOrderInfoForRefund()),
  };
};

const styles = StyleSheet.create({
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
  returnGoodsContainer: {
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  returnGoodsLabelContainer: {
    height: 42,
    justifyContent: 'center',
  },
  returnGoodsLabel: {
    fontSize: 16,
    marginLeft: 20,
  },
  returnGood: {
    marginLeft: 20,
    height: 35,
    justifyContent: 'center',
  },
});

export default connect(state => state, actions)(RefundPage);
