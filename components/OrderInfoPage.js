import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import OrderHead from './OrderHead';

const {height, width} = Dimensions.get('window');

class OrderInfoPage extends Component {

  render() {
    return (
      <ScrollView>
        <OrderHead orderSn={this.props.order_sn} orderStatus={this.props.status}/>
      </ScrollView>
    );
    // <View style={styles.addressContainer}>
    //   <View style={styles.receiverContainer}>
    //     <Text style={styles.receiverName}>某某收</Text>
    //     <Text style={styles.receiverMobile}>12383989800</Text>
    //     <Text style={styles.receiverAddress} numberOfLines={1}>就一个地址</Text>
    //   </View>
    // </View>
  }

}

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    height: 80,
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
});

export default OrderInfoPage;
