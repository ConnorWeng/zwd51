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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import TouchableContainerItem from './TouchableContainerItem';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';

const {height, width} = Dimensions.get('window');

class RefundPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.orderAmount,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款原因：</Text>
              <Picker style={{flex: 1}}>
                <Picker.Item key="1" label="退还商品差价(换货)" value="1"/>
                <Picker.Item key="2" label="申请退货" value="2"/>
                <Picker.Item key="3" label="全额退款(取消订单)" value="3"/>
              </Picker>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款金额：</Text>
              <TextInput style={{flex: 1}} keyboardType="numeric" value={this.state.amount}/>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>退款说明：</Text>
              <TextInput style={{flex: 1}}/>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
        </ScrollView>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => {}} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

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

export default RefundPage;
