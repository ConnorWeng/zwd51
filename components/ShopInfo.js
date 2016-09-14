import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ShopInfo extends Component {

  render() {
    return (
      <View style={styles.storeContainer}>
        <View style={styles.storeHeadContainer}>
          <View style={styles.storeHead}>
            <Text style={styles.storeName}>{this.props.storeName}</Text>
            <View style={styles.storeSeePriceContainer}>
              <Text style={styles.storeSeePrice}>{this.props.seePrice}</Text>
            </View>
          </View>
          <Text style={styles.storeAddress}>{this.props.address}</Text>
        </View>
        <View style={styles.storeBodyContainer}>
          <Text style={styles.storeBusinessScopeLabel}>主营：</Text>
          <Text style={styles.storeBusinessScope}>{this.props.businessScope}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  storeContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeHeadContainer: {
    marginLeft: 5,
  },
  storeHead: {
    flexDirection: 'row',
  },
  storeName: {
    fontSize: 18,
    color: '#000000',
  },
  storeSeePriceContainer: {
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#f40',
    justifyContent: 'center',
  },
  storeSeePrice: {
    fontSize: 14,
    color: '#ffffff',
  },
  storeAddress: {
    fontSize: 14,
  },
  storeBodyContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeBusinessScopeLabel: {
    color: '#000000',
  },
});

export default ShopInfo;