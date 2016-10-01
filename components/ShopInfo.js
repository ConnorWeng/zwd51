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
            <Text style={styles.storeName}>{this.props.store_name}</Text>
            <View style={styles.storeSeePriceContainer}>
              <Text style={styles.storeSeePrice}>{this.props.see_price}</Text>
            </View>
          </View>
          <Text style={styles.storeAddress}>
            {this.props.mk_name}-{this.props.address}
          </Text>
        </View>
        <View style={styles.storeBodyContainer}>
          <Text style={styles.storeBusinessScopeLabel}>主营：</Text>
          <Text style={styles.storeBusinessScope}>{this.props.business_scope}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  storeContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeHeadContainer: {
    paddingLeft: 15,
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
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  storeBusinessScopeLabel: {
    color: '#000000',
  },
});

export default ShopInfo;
