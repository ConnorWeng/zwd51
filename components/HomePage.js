import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class HomePage extends Component {

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
      <View>
        <View style={styles.banner}>
          <Text>banner</Text>
        </View>
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.items)}
           renderRow={this.renderTrendyItem.bind(this)}/>
        <ListView
           contentContainerStyle={styles.hotItemContainer}
           dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.items)}
           renderRow={this.renderHotItem.bind(this)}/>
      </View>
    );
  }

  renderTrendyItem(item) {
    return (
      <TouchableHighlight style={styles.trendyItemContainer}>
        <View style={theme.cardStyle}>
          <Image source={{uri : item.defaultImage}} style={theme.cardImageStyle} />
          <Text style={[theme.cardTitleStyle, styles.trendyItemTitle]}>{item.goodsName}</Text>
          <View style={theme.cardActionStyle}>
            <Text>上传淘宝</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderHotItem(item) {
    return (
      <TouchableHighlight style={styles.hotItem}>
        <View>
          <Image source={{uri : item.defaultImage}} style={styles.hotItemImage}/>
          <Text style={styles.hotItemTitle}>{item.goodsName}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  banner: {
    height: 150,
    backgroundColor: 'rgba(140,140,140,1)'
  },
  trendyItemContainer: {
    paddingTop: 8
  },
  trendyItemTitle: {
    fontSize: 16
  },
  hotItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  hotItem: {
    width: (width-10) / 2 - 1
  },
  hotItemImage: {
    width: (width-10) / 2 - 1,
    height: 200
  },
  hotItemTitle: {
    fontSize: 12
  }
});

const MOCKED_DATA = {
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
    goodsName: '实拍 8511# 新款韩版女装时尚短袖印花T恤宽松大码T恤衫',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/485700822/TB216FtnXXXXXcXXXXXXXXXXXXX_!!485700822.jpg',
    price: '21.00'
  }]
};

export default HomePage;
