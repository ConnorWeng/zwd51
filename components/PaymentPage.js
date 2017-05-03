import React, {Component} from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import PrimaryButton from './PrimaryButton';
import {mapDispatchToProps} from '../actions/mapper';

class PaymentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selected: '支付宝',
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => {this.setState({selected: '支付宝'});}}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentLogoContainer}>
              <Image source={require('../images/alipay48x48.png')}/>
              <View style={styles.paymentTitleContainer}>
                <Text style={{fontSize: 18, color: '#000000',}}>支付宝</Text>
                <Text>数亿用户都在用，安全可托付</Text>
              </View>
            </View>
            {'支付宝' == this.state.selected ? <Icon style={styles.checkbox} name="ios-checkbox-outline" size={30} color="rgb(0,200,0)" /> : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.setState({selected: '微信'});}}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentLogoContainer}>
              <Image source={require('../images/icon48_appwx_logo.png')}/>
              <View style={styles.paymentTitleContainer}>
                <Text style={{fontSize: 18, color: '#000000',}}>微信支付</Text>
                <Text>亿万用户的选择，更快更安全</Text>
              </View>
            </View>
            {'微信' == this.state.selected ? <Icon style={styles.checkbox} name="ios-checkbox-outline" size={30} color="rgb(0,200,0)" /> : null}
          </View>
        </TouchableOpacity>
        <PrimaryButton label={'确认支付 ¥' + this.props.orderAmount} onPress={this.pay.bind(this)}/>
        <Spinner visible={this.state.loading}/>
      </ScrollView>
    );
  }

  pay() {
    if (this.state.selected === '支付宝') {
      NativeModules.AlibabaAPI.pay(this.props.orderInfo,
                                   ((navigator) => {
                                     return () => {
                                       navigator.pop();
                                       navigator.pop();
                                     };
                                   })(this.props.navigator),
                                   (msg) => {
                                     ToastAndroid.show(msg, ToastAndroid.SHORT);
                                   });
    } else if (this.state.selected === '微信') {
      this.setState({loading: true});
      this.props.wechatPrepay(this.props.orderId, this.props.member.accessToken).then((json) => {
        if (json.error) {
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
          return ;
        }
        NativeModules.WxAPI.pay(json.appid, json.partnerid, json.prepayid, json.package, json.noncestr, json.timestamp + '', json.sign,
                               ((navigator) => {
                                 return () => {
                                   this.setState({loading: false});
                                   navigator.pop();
                                   navigator.pop();
                                 };
                               })(this.props.navigator));
      });
    }
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  paymentLogoContainer: {
    flexDirection: 'row',
    flex: 8,
  },
  checkbox: {
    flex: 1,
  },
  paymentTitleContainer: {
    justifyContent: 'space-between',
    marginLeft: 10,
  }
});

export default connect(state => state, mapDispatchToProps)(PaymentPage);
