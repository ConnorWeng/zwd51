import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableContainerItem from './TouchableContainerItem';
import TouchableContainerItemsGroup from './TouchableContainerItemsGroup';

const {height, width} = Dimensions.get('window');

class OrderConfirmPage extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableContainerItemsGroup>
            <TouchableContainerItem style={{height: 80}} arrow={true}>
              <Text style={styles.receiverName}>小小明</Text>
              <Text style={styles.receiverMobile}>13819878374</Text>
              <Text style={styles.receiverAddress} numberOfLines={1}>上海市卢湾区上岛名邸8号808室</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 100}} bodyStyle={{justifyContent: 'space-between'}} arrow={true}>
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.itemImage}
                       source={{uri: 'http://g.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=a5656052494a20a4314b34c1a062b41a/79f0f736afc37931ec26be69edc4b74543a91127.jpg'}}/>
                <Image style={styles.itemImage}
                       source={{uri: 'http://g.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=a5656052494a20a4314b34c1a062b41a/79f0f736afc37931ec26be69edc4b74543a91127.jpg'}}/>
              </View>
              <Text>共2件</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 60}} arrow={false}>
              <Text style={{fontSize: 16}}>配送：51代发</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
          <TouchableContainerItemsGroup style={{marginTop: 10}}>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>商品金额</Text>
              <Text style={{color: '#f40'}}>322.40</Text>
            </TouchableContainerItem>
            <TouchableContainerItem style={{height: 40}} bodyStyle={{justifyContent: 'space-between'}} arrow={false}>
              <Text>代发费用</Text>
              <Text style={{color: '#f40'}}>+ 10.00</Text>
            </TouchableContainerItem>
          </TouchableContainerItemsGroup>
        </ScrollView>
        <View style={styles.actionContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>实付款：¥332.40</Text>
          </View>
          <TouchableOpacity onPress={()=>{}} style={[styles.submitAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.submitActionText, {color: '#fff'}]}>提交订单</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
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
  },
  priceContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  priceText: {
    color: '#f40',
    fontSize: 20,
  },
  itemImage: {
    height: 60,
    width: 60,
    marginRight: 5,
  },
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

export default OrderConfirmPage;
