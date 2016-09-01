import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import PrimaryButton from './PrimaryButton';

class PaymentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      remain: false,
      alipay: true,
    };
  }

  render() {
    return (
      <ScrollView>
        <CheckBox
          label='余额'
          labelBefore={true}
          checked={this.state.remain}
          containerStyle={styles.checkboxContainter}
          labelStyle={styles.checkboxLabel}
          onChange={(checked) => this.setState({remain: checked, alipay: !checked})}/>
        <CheckBox
          label='支付宝'
          labelBefore={true}
          checked={this.state.alipay}
          containerStyle={styles.checkboxContainter}
          labelStyle={styles.checkboxLabel}
          onChange={(checked) => this.setState({alipay: checked, remain: !checked})}/>
        <PrimaryButton label='确认支付 ¥332.40' onPress={() => console.log('pay')}/>
      </ScrollView>
    );
  }

  isChecked(method) {
    if (this.state.paymentMethod === method) {
      return true;
    } else {
      return false;
    }
  }

}

const styles = StyleSheet.create({
  checkboxContainter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  checkboxLabel: {
    fontSize: 20,
    color: '#000000'
  },
});

export default PaymentPage;