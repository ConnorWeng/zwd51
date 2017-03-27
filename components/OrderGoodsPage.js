import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

class OrderGoodsPage extends Component {

  render() {
    const goodsList = [];
    this.props.goods.forEach((good) => {
      goodsList.push(
        <View key={'good_' + good.goods_id} style={styles.goodContainer}>
          <Image style={styles.goodImage} source={{uri: good.goods_image}}/>
          <View style={styles.goodDetailsContainer}>
            <Text style={styles.goodName} numberOfLines={2}>{good.goods_name}</Text>
            <Text>{good.specification}</Text>
            <View style={styles.goodPriceContainer}>
              <Text style={styles.goodSubtotal}>¥ {good.subtotal || good.price}</Text>
              <Text>x{good.quantity}</Text>
            </View>
          </View>
        </View>
      );
    });
    return (
      <ScrollView>
        {goodsList}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  goodContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  goodDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  goodName: {
    fontSize: 12,
    color: '#000000',
  },
  goodImage: {
    height: 60,
    width: 60,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  goodPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goodSubtotal: {
    color: '#f40',
  },
});

export default OrderGoodsPage;
