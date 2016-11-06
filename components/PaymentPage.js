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
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from './PrimaryButton';

class PaymentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        <PrimaryButton label={'确认支付 ¥' + this.props.orderAmount} onPress={this.pay.bind(this)}/>
      </ScrollView>
    );
  }

  pay() {
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

export default PaymentPage;
