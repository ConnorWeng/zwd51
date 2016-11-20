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
import {applyRefund} from '../actions';

const {height, width} = Dimensions.get('window');

class RefundPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.orderAmount,
      intro: '',
      reason: '退还商品差价(换货)',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.applyRefundRequest.message) {
      ToastAndroid.show(nextProps.order.applyRefundRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.order.applyRefundRequest.success) {
      ToastAndroid.show('已提交申请', ToastAndroid.SHORT);
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款原因：</Text>
              <Picker style={{flex: 1}} selectedValue={this.state.reason} onValueChange={(value) => this.setState({reason: value})}>
                <Picker.Item key="1" label="退还商品差价(换货)" value="退还商品差价(换货)"/>
                <Picker.Item key="3" label="全额退款(取消订单)" value="全额退款(取消订单)"/>
              </Picker>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款金额：</Text>
              <TextInput ref="amountInput" style={{flex: 1}} keyboardType="numeric" value={this.state.amount} onChangeText={(text) => this.setState({amount: text})}/>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款说明：</Text>
              <TextInput ref="introInput" style={{flex: 1}} value={this.state.intro} onChangeText={(text) => this.setState({intro: text})}/>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
        </ScrollView>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => {this.props.applyRefund(this.props.orderId, this.state.amount, this.state.reason, this.state.intro, this.props.member.accessToken);}} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>提交</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.props.order.applyRefundRequest.isLoading}/>
      </View>
    );
  }

}

const actions = (dispatch) => {
  return {
    applyRefund: (orderId, refundAmount, refundReason, refundIntro, accessToken) => dispatch(applyRefund(orderId, refundAmount, refundReason, refundIntro, accessToken)),
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
});

export default connect(state => state, actions)(RefundPage);
