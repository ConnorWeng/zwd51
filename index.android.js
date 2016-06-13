/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Navigator,
  BackAndroid
} from 'react-native';

import Item from './item';

var MOCKED_DATA = {
  items: [{
    goodsName: '实拍9671#欧美潮T短袖女装T恤洗水怀旧女上衣',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i4/TB1kTZSHFXXXXaDapXXXXXXXXXX_!!0-item_pic.jpg',
    price: '56.00'
  }, {
    goodsName: '8736#2016年夏季新款女装民族风印花短袖盘扣文艺棉麻连衣裙',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/TB1aMZ.JFXXXXb8XFXXXXXXXXXX_!!0-item_pic.jpg',
    price: '52.00'
  }, {
    goodsName: '实拍 春夏新款女装七分袖印花高腰中长款连衣裙一字领打底裙A字裙',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i2/685489829/TB25wNhopXXXXc1XpXXXXXXXXXX_!!685489829.jpg',
    price: '45.00'
  }, {
    goodsName: '(实拍)新款8259 浅色宽松破洞休闲磨破牛仔哈伦裤女垮裤',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/855301567/TB2.h.HlpXXXXXZXXXXXXXXXXXX_!!855301567.jpg',
    price: '36.00'
  }, {
    goodsName: '实拍现货9621#2016情侣装 韩版宽松 印花百搭情侣T恤潮',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i2/1993861789/TB2JSJ2oVXXXXbiXXXXXXXXXXXX_!!1993861789.jpg',
    price: '18.00'
  }, {
    goodsName: '实拍6702#2016夏装情侣装 刺绣字母宽松学生日系简约百搭韩版短袖',
    defaultImage: 'http://img.alicdn.com/bao/uploaded/i4/735090978/TB2DZKdopXXXXXWXFXXXXXXXXXX-735090978.jpg_240x240.jpg',
    price: '18.00'
  }, {
    goodsName: '6688#实拍小清新甜美夏装韩版短袖网纱罩衫无袖背心连衣裙两件套',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/2105755207/TB28eSyqpXXXXX9XpXXXXXXXXXX_!!2105755207.jpg',
    price: '25.00'
  }, {
    goodsName: '实拍 8511# 新款韩版女装时尚短袖印花T恤宽松大码T恤衫',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/485700822/TB216FtnXXXXXcXXXXXXXXXXXXX_!!485700822.jpg',
    price: '21.00'
  }]
};

class zwd51 extends Component {
  componentDidMount() {
    var navigator = this._navigator;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <Navigator initialRoute={{scene: Index}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, nav) {
    this._navigator = nav;
    return (
      <route.scene navigator={nav}/>
    );
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.items)}
        renderRow={this.renderItem.bind(this)}/>
    );
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={() => this.goToItemDetail(item)}>
        <View style={styles.container}>
          <Image style={styles.pic} source={{uri: item.defaultImage}}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>
              {item.goodsName}
            </Text>
            <Text style={styles.price}>
              价格: {item.price}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  goToItemDetail(item) {
    this.props.navigator.push({scene: Item});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  pic: {
    height: 80,
    width: 80
  },
  title: {
    flex: 1,
    fontSize: 15
  },
  price: {
    color: '#333333'
  }
});

AppRegistry.registerComponent('zwd51', () => zwd51);
